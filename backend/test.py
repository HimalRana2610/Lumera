import os
import requests
from dotenv import load_dotenv

# Load environment variables from .env (works whether imported by app.py or run directly)
load_dotenv()
_ENV_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), ".env")
if os.path.exists(_ENV_PATH):
    load_dotenv(dotenv_path=_ENV_PATH, override=False)

# Default kept so the app works out of the box; override with HF_API_URL in .env
DEFAULT_API_URL = "https://shreyansh313-grin.hf.space/predict"


def test_api(image_path):
    """Send an image to the Hugging Face prediction Space and return the JSON result."""
    api_url = os.getenv("HF_API_URL", DEFAULT_API_URL)
    api_key = os.getenv("HF_API_SECRET_KEY")  # only needed if the Space enforces it

    if not os.path.exists(image_path):
        print(f"❌ Error: Image file not found at {image_path}")
        return None

    try:
        headers = {"x-api-key": api_key} if api_key else {}
        with open(image_path, "rb") as image_file:
            files_payload = {"image": (os.path.basename(image_path), image_file)}
            response = requests.post(api_url, files=files_payload, headers=headers)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.HTTPError as http_err:
        print(f"HTTP error: {http_err}")
        return None
    except requests.exceptions.RequestException as req_err:
        print(f"Connection error: {req_err}")
        return None
    except Exception as e:
        print(f"Unexpected error: {e}")
        return None


# Ad-hoc CLI test: set TEST_IMAGE_PATH in your environment, then run `python test.py`
if __name__ == "__main__":
    image_path = os.getenv("TEST_IMAGE_PATH", "")
    if not image_path:
        print("Set TEST_IMAGE_PATH to an image file path to run a standalone test.")
    else:
        print(test_api(image_path))
