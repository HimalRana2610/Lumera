import requests
import os
import json

# 1. Set the URL of your PUBLIC deployed API
API_URL = "https://shreyansh313-grin.hf.space/predict"

# 2. Set your secret API key
#    !!!! IMPORTANT !!!!
#    This MUST match the value you set in your Hugging Face Space "Secrets"
MY_SECRET_KEY = os.getenv("HF_API_SECRET_KEY") # <-- CHANGE THIS to your secret

# 3. Set the path to the image you want to test
IMAGE_PATH = "C:\\new pc\\ML project\\Lumera\\backend\\static\\user_images\\pic1_20251017_002003_938173.jpg" # I used the path from your log

def test_api(image_path):
    """
    Sends an image to the secured public endpoint and prints the result.
    """
    if not os.path.exists(image_path):
        print(f"❌ Error: Image file not found at {image_path}")
        print("Please update the IMAGE_PATH variable to a valid file path.")
        return
    
    if MY_SECRET_KEY == "my_super_secret_key_12345":
        print("⚠️ WARNING: Please update the 'MY_SECRET_KEY' variable in this script.")

    try:
        headers = {"x-api-key": MY_SECRET_KEY}
        with open(image_path, "rb") as image_file:
            files_payload = {"image": (os.path.basename(image_path), image_file)}
            response = requests.post(API_URL, files=files_payload, headers=headers)
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

# Run the test
if __name__ == "__main__":
    test_api(IMAGE_PATH)
