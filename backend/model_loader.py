import json
import io
from typing import Dict
import torch
from PIL import Image
import torchvision.transforms as T
import timm

# Define the attributes list
ATTRIBUTES = [
    "attractive", "blurry_image", "sharp_jawline", "high_cheekbones", "smiling", "bald", "receeding_hairline", "long_hair", "curly_hair",
    "grey_hair", "black_hair", "has_beard", "patchy_beard", "has_mustache", "well_groomed", "has_makeup", "wearing_glasses", "wearing_hat",
    "clear_skin", "dark_circles", "oily_skin", "thick_eyebrow", "big_eyes", "big_lips", "sharp_nose", "adult", "old", "mouth_open", "male",
    "double_chin", "veil", "dry_skin", "freckle", "wrinkle", "chubby"
]

# Image size
IMG_SIZE = 224

# Device setup
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"Using device: {device}")

# Function to build the model
def build_model(num_classes: int, backbone="convnext_tiny", pretrained=False):
    model = timm.create_model(backbone, pretrained=pretrained, num_classes=num_classes)
    return model

# Transforms for inference
def get_transforms(img_size=IMG_SIZE):
    return T.Compose([
        T.Resize(int(img_size * 1.14)),
        T.CenterCrop(img_size),
        T.ToTensor(),
        T.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ])

# Global model variable
model = None

def load_model():
    """Load the pre-trained model and return it."""
    global model
    if model is None:
        print("Loading AI model...")
        model = build_model(len(ATTRIBUTES), backbone="convnext_tiny", pretrained=False)
        model.load_state_dict(torch.load("./model/convnext_tiny_celeb.pth", map_location=device))
        model = model.to(device)
        model.eval()
        print("Model loaded successfully.")
    return model

# Load the model when this module is imported
model = load_model()

# Function to predict attributes from image bytes
def predict_attributes_from_bytes(image_bytes: bytes, threshold: float = 0.5) -> dict:
    """
    Takes image bytes as input, runs inference with the loaded model,
    and returns a dictionary with attributes and their predicted probabilities and binary labels.

    Args:
        image_bytes (bytes): Image data as bytes.
        threshold (float): Probability threshold for binary classification (default 0.5).
    Returns:
        dict: Dictionary of the form:
        {
            "attribute1": {"probability": 0.85, "predicted": true},
            "attribute2": {"probability": 0.12, "predicted": false},
            ...
        }
    """
    try:
        # Ensure model is loaded
        global model
        if model is None:
            model = load_model()
        
        # Load and preprocess the image from bytes
        img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        transforms = get_transforms()
        img_tensor = transforms(img).unsqueeze(0).to(device)

        # Inference
        with torch.no_grad():
            logits = model(img_tensor)
            probs = torch.sigmoid(logits).squeeze(0).cpu().numpy()

        # Create dictionary with probabilities and binary predictions
        result = {}
        for attr, prob in zip(ATTRIBUTES, probs):
            result[attr] = {
                "probability": float(prob),
                "predicted": bool(prob >= threshold)
            }

        return result

    except Exception as e:
        return {"error": f"An error occurred: {str(e)}"}

# Function to predict attributes and return JSON string (legacy support)
def predict_attributes(image_path: str, threshold: float = 0.5) -> str:
    """
    Takes an image path as input, runs inference with the loaded model,
    and returns a JSON string with attributes and their predicted probabilities and binary labels.

    Args:
        image_path (str): Path to the input image file.
        threshold (float): Probability threshold for binary classification (default 0.5).
    Returns:
        str: JSON string of the form:
        {
            "attribute1": {"probability": 0.85, "predicted": true},
            "attribute2": {"probability": 0.12, "predicted": false},
            ...
        }
    """
    try:
        # Ensure model is loaded
        global model
        if model is None:
            model = load_model()
        
        # Load and preprocess the image
        img = Image.open(image_path).convert("RGB")
        transforms = get_transforms()
        img_tensor = transforms(img).unsqueeze(0).to(device)

        # Inference
        with torch.no_grad():
            logits = model(img_tensor)
            probs = torch.sigmoid(logits).squeeze(0).cpu().numpy()

        # Create dictionary with probabilities and binary predictions
        result = {}
        for attr, prob in zip(ATTRIBUTES, probs):
            result[attr] = {
                "probability": float(prob),
                "predicted": bool(prob >= threshold)
            }

        # Return as JSON string
        return json.dumps(result, indent=4)

    except FileNotFoundError:
        return json.dumps({"error": f"Image file {image_path} not found"}, indent=4)
    except Exception as e:
        return json.dumps({"error": f"An error occurred: {str(e)}"}, indent=4)

# Example usage
if __name__ == "__main__":
    # Replace with your image path
    image_path = "./download.jpg"
    json_output = predict_attributes(image_path)
    print(json_output)
    # Optionally save to file
    with open("./attributes.json", "w") as f:
        f.write(json_output)