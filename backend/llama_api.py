"""Utilities for interacting with the Llama 4 API."""

import json
import os
import pytesseract
from PIL import Image
import base64
from dotenv import load_dotenv
from llama_api_client import LlamaAPIClient

from PyTypes import FormDetails, ImageType

load_dotenv()
api_key = os.environ.get("LLAMA_API_KEY")
print(f"\n\n\nUsing Llama API Key: {api_key} with a length of {len(api_key)}\n\n\n")
client = LlamaAPIClient(api_key=api_key)


def image_to_base64(image_path):
    with open(image_path, "rb") as img:
        return base64.b64encode(img.read()).decode("utf-8")


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
                        "image_url": {"url": f"data:image/jpeg;base64,{base64_image}"},
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
                            "url": f"data:image/{image_path.split(".")[1]};base64,{image_to_base64(image_path)}"
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
                        "image_url": {"url": f"data:image/jpeg;base64,{base64_image}"},
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


if __name__ == "__main__":
    image_path = os.getcwd() + "/testImages/banana.png"
    print(classfyImage(image_path))

    image_path = os.getcwd() + "/testImages/FrenchForm.png"
    print(classfyImage(image_path))

    image_path = os.getcwd() + "/testImages/handwrittenImage.png"
    print(classfyImage(image_path))

    image_path = os.getcwd() + "/testImages/DirectionsHandwritten.jpeg"
    print(getHandWrittenTextFromImage(image_path))
