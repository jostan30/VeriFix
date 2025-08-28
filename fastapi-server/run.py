import uvicorn
import sys
import os

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

if __name__ == "__main__":
    print("Starting Verifix ML Server...")
    try:
        uvicorn.run(
            "app.main:app",
            host="127.0.0.1",
            port=8080,
            reload=True,
            log_level="info"
        )
    except Exception as e:
        print(f"Error starting server: {e}")
        print("Make sure app/main.py exists and contains the FastAPI app")
