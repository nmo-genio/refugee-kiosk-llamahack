# Placeholder main app for the backend API server.
# To be implemented with Flask or FastAPI.

# if __name__ == '__main__':
#     print("Backend server placeholder")

from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}