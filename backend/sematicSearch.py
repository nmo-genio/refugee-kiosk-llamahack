import os
import pdfplumber
from docx import Document
from sentence_transformers import SentenceTransformer, util
from langdetect import detect
from reportlab.lib.pagesizes import letter

model = SentenceTransformer("all-MiniLM-L6-v2")


def extract_text_from_pdf(pdf_path):
    print(f"Extracting text from PDF: {pdf_path}")
    with pdfplumber.open(pdf_path) as pdf:
        pages = pdf.pages
        text = "\n".join([page.extract_text() for page in pages if page.extract_text()])

    detected_language = detect(text)
    print(f"Detected language: {detected_language}")

    # if detected_language != "en":
    #     translated = translateText(text, "en")
    #     c = canvas.Canvas(pdf_path, pagesize=letter)
    #     c.setFont("Helvetica", 12)

    #     for page in pages:
    #         original_text = page.extract_text()
    #         if original_text:
    #             translated_page_text = translateText(original_text, "en")
    #             c.drawString(
    #                 50, 750, translated_page_text
    #             )  # Adjust coordinates as needed
    #             c.showPage()
    #     c.save()

    #     return translated

    return text


def extract_text_from_docx(docx_path):
    doc = Document(docx_path)
    return "\n".join([para.text for para in doc.paragraphs])


# --- Step 3: Chunking Utility ---
def split_text_into_chunks(text, chunk_size=500):
    words = text.split()
    return [
        " ".join(words[i : i + chunk_size]) for i in range(0, len(words), chunk_size)
    ]


file_dir = os.getcwd() + "/Data"
corpus = []
metadata = []

for file in os.listdir(file_dir):
    path = os.path.join(file_dir, file)
    if file.lower().endswith(".pdf"):
        text = extract_text_from_pdf(path)
    elif file.lower().endswith(".docx"):
        text = extract_text_from_docx(path)
    else:
        continue

    chunks = split_text_into_chunks(text)
    corpus.extend(chunks)
    metadata.extend([(file, i) for i in range(len(chunks))])

corpus_embeddings = model.encode(corpus, convert_to_tensor=True)


def semantic_search(query, top_k=5):
    query_embedding = model.encode(query, convert_to_tensor=True)
    hits = util.semantic_search(query_embedding, corpus_embeddings, top_k=top_k)[0]

    results = []
    for hit in hits:
        score = float(hit["score"])
        text = corpus[hit["corpus_id"]]
        source, chunk_index = metadata[hit["corpus_id"]]
        results.append((score, source, chunk_index, text))

    return results


query = "Where do I, a refugee, go in an emergency situations?"
results = semantic_search(query)

for score, source, idx, text in results:
    print(f"File: {source} (Chunk {idx}) | Score: {score:.4f}\n{text}\n{'-'*80}")
