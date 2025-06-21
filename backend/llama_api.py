"""Utilities for interacting with the Llama 4 API."""

# Placeholder for API wrapper functions
from dotenv import load_dotenv
load_dotenv()


import os
api_key = os.environ.get("LLAMA_API_KEY")

from llama_api_client import LlamaAPIClient


client = LlamaAPIClient()

models = client.models.list()
for model in models:
    print(model.id)