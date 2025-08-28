from fastapi import FastAPI
import uvicorn

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Verifix ML Server is working!"}

@app.get("/test")
def test_endpoint():
    return {"status": "success", "data": "API is responding"}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8080)