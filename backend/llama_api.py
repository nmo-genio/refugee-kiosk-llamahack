"""Utilities for interacting with the Llama 4 API."""

import json
import os
from PIL import Image
import base64
from dotenv import load_dotenv
from llama_api_client import LlamaAPIClient
from io import BytesIO

from PyTypes import FormDetails, ImageType
from sematicSearch import semantic_search

load_dotenv()
api_key = os.environ.get("LLAMA_API_KEY")
print(f"\n\n\nUsing Llama API Key: {api_key} with a length of {len(api_key)}\n\n\n")
client = LlamaAPIClient(api_key=api_key)


def image_to_base64(image_path):
    """
    Open and normalize the image to JPEG/PNG, enforce <5MB size,
    then return a Base64-encoded string.
    """
    # Load and normalize format
    img = Image.open(image_path)
    orig_format = img.format or "PNG"
    fmt = (
        orig_format if orig_format in ("JPEG", "PNG") else "PNG"
    )  # enforce supported formats :contentReference[oaicite:6]{index=6}

    # Save to buffer
    buffer = BytesIO()
    img.save(buffer, format=fmt)
    data = buffer.getvalue()
    buffer.close()

    # Ensure size ≤ 5MB; if not, downsize or recompress
    max_bytes = 5 * 1024 * 1024  # 5 MB limit :contentReference[oaicite:7]{index=7}
    if len(data) > max_bytes:
        # First, try resizing to max 1024×1024
        img.thumbnail((1024, 1024))
        buffer = BytesIO()
        img.save(
            buffer, format=fmt, quality=85
        )  # initial compression :contentReference[oaicite:8]{index=8}
        data = buffer.getvalue()
        buffer.close()

        # If still too large and JPEG, reduce quality iteratively
        if fmt == "JPEG":
            quality = 80
            while len(data) > max_bytes and quality >= 20:
                buffer = BytesIO()
                img.save(buffer, format="JPEG", quality=quality)
                data = buffer.getvalue()
                buffer.close()
                quality -= 10

    # Return Base64 string
    return base64.b64encode(data).decode("utf-8")


def getFormDetails(image_path):
    base64_image = image_to_base64(image_path)

    response = client.chat.completions.create(
        model="Llama-4-Maverick-17B-128E-Instruct-FP8",
        messages=[
            {
                "role": "system",
                "content": [
                    {
                        "type": "text",
                        "text": "You will be helping classify and extract info from images of forms uploaded by refugees so that they can be processed further and the refugees can be assisted.",
                    },
                ],
            },
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": "What type of form is this? What is the form number, language, and issuing authority?",
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/{image_path.split('.')[-1]};base64,{base64_image}"
                        },
                    },
                ],
            },
        ],
        response_format={
            "type": "json_schema",
            "json_schema": {
                "name": FormDetails.__name__,
                "schema": FormDetails.model_json_schema(),
            },
        },
    )

    response_data = json.loads(response.completion_message.content.text)
    return response_data


def getHandWrittenTextFromImage(image_path, language="en"):
    response = client.chat.completions.create(
        model="Llama-4-Maverick-17B-128E-Instruct-FP8",
        messages=[
            {
                "role": "system",
                "content": [
                    {
                        "type": "text",
                        "text": "You will be helping extract text from images uploaded by refugees. The text should be extracted accurately.",
                    },
                ],
            },
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": f"Please extract the text from the following image and return it in a simple, accurate, and contextually appropriate manner. Do not return any other information or text such as 'The text extracted from the image is: '. If the the text is handwritten, check if words are misspelled and correct them. If words are crossed out, do not include them in the text.",
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/{image_path.split('.')[-1]};base64,{image_to_base64(image_path)}"
                        },
                    },
                ],
            },
        ],
        response_format={
            "type": "text",
        },
    )

    response_text = response.completion_message.content.text.strip()
    if response_text:
        return response_text


def translateText(text, target_language):
    response = client.chat.completions.create(
        model="Llama-4-Maverick-17B-128E-Instruct-FP8",
        messages=[
            {
                "role": "system",
                "content": [
                    {
                        "type": "text",
                        "text": f"You will be helping translate text to {target_language} for refugees so that they can understand the content. Please ensure the translation is simple, acccurate, and contextually appropriate. Do not return any other information or text such as 'The translation is: '.",
                    },
                ],
            },
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": f"Please translate the following text to {target_language}: {text}",
                    },
                ],
            },
        ],
        response_format={
            "type": "text",
        },
    )

    return response.completion_message.content.text


def classfyImage(image_path):
    base64_image = image_to_base64(image_path)

    response = client.chat.completions.create(
        model="Llama-4-Maverick-17B-128E-Instruct-FP8",
        messages=[
            {
                "role": "system",
                "content": [
                    {
                        "type": "text",
                        "text": "You will be helping classify images uploaded by refugees so that they can be processed further and the refugees can be assisted. if the image not something that a refugee would upload, then you should return a response that indicates that the image is not relevant",
                    },
                ],
            },
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": "What type of image is this? Is it a form, a hand written note with directions, a hand written note that, or other text?",
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/{image_path.split('.')[-1]};base64,{base64_image}"
                        },
                    },
                ],
            },
        ],
        response_format={
            "type": "json_schema",
            "json_schema": {
                "name": ImageType.__name__,
                "schema": ImageType.model_json_schema(),
            },
        },
    )

    response_data = json.loads(response.completion_message.content.text)
    return response_data


def chatWithLLAMA(propmt, **kwargs):
    if "ImagePath" in kwargs:
        image_path = kwargs["ImagePath"]
        base64_image = image_to_base64(image_path)
        image_message = {
            "type": "image_url",
            "image_url": {
                "url": f"data:image/{image_path.split('.')[-1]};base64,{base64_image}"
            },
        }

    messages = [
        {
            "role": "system",
            "content": [
                {
                    "type": "text",
                    "text": "You will be helping refugees by answering their questions and providing information.",
                },
            ],
        },
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": propmt,
                },
            ],
        },
    ]

    if "ImagePath" in kwargs:
        messages.append(
            {
                "role": "user",
                "content": [
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/{image_path.split('.')[-1]};base64,{base64_image}"
                        },
                    },
                ],
            }
        )

    messages.append(
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": f"{semantic_search(propmt)}",
                },
            ],
        }
    )

    if "PreviousMessages" in kwargs:
        previous_messages = kwargs["PreviousMessages"]
        messages.insert(0, previous_messages)

    response = client.chat.completions.create(
        model="Llama-4-Maverick-17B-128E-Instruct-FP8",
        messages=messages,
        response_format={
            "type": "text",
        },
    )

    return response.completion_message.content.text.strip(), messages.append(
        response.completion_message
    )


def findDirectionsto(location):
    image_path = os.getcwd() + "/testImages/SatelliteMap.png"
    base64_image = image_to_base64(image_path)

    messages = [
        {
            "role": "system",
            "content": [
                {
                    "type": "text",
                    "text": """You will be helping refugees by providing directions to various locations within the Diavata Refugee Camp in Greece based on the Satellite map attached.
                                Here is what you need to do:
                                1. Use the satellite map to predict the position of the location.
                                2. Find the path to the location from the main entrance of the camp from the red point (the current location).
                                3. Use the scale on the bottom right of the map to estimate the distances.
                                4. Provide the directions in a simple, accurate, and contextually appropriate manner.
                                5. Do not return any other information or text such as 'The directions are: '.
                                example output:
                                Walk 200m north to the main path. Turn right and continue for 150m. The food will be on your left.
                                """,
                },
            ],
        },
        {
            "role": "user",
            "content": [
                {
                    "type": "image_url",
                    "image_url": {
                        "url": f"data:image/{image_path.split('.')[-1]};base64,{base64_image}"
                    },
                },
            ],
        },
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": f"Please provide directions to {location}.",
                },
            ],
        },
    ]

    response = client.chat.completions.create(
        model="Llama-4-Maverick-17B-128E-Instruct-FP8",
        messages=messages,
        response_format={
            "type": "text",
        },
    )

    return response.completion_message.content.text.strip()


if __name__ == "__main__":
    print(findDirectionsto("play ground"))
