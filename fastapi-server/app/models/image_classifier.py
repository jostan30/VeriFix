import torch
import torch.nn as nn
import torchvision.transforms as transforms
from torchvision import models
from PIL import Image
import numpy as np

class ImageClassifier:
    def __init__(self, num_classes=1000, model_name='resnet18'):
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.num_classes = num_classes
        
        # Load pre-trained model
        if model_name == 'resnet18':
            self.model = models.resnet18(pretrained=True)
            self.model.fc = nn.Linear(self.model.fc.in_features, num_classes)
        
        self.model.to(self.device)
        
        # Define transforms
        self.transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], 
                               std=[0.229, 0.224, 0.225])
        ])
        
    def preprocess_image(self, image_path):
        image = Image.open(image_path).convert('RGB')
        return self.transform(image).unsqueeze(0)
    
    def predict(self, image_path):
        self.model.eval()
        with torch.no_grad():
            image_tensor = self.preprocess_image(image_path)
            image_tensor = image_tensor.to(self.device)
            
            outputs = self.model(image_tensor)
            probabilities = torch.nn.functional.softmax(outputs, dim=1)
            
            return probabilities.cpu().numpy()
    
    def validate_image(self, image_path, threshold=0.5):
        """Simple validation based on prediction confidence"""
        probs = self.predict(image_path)
        max_prob = np.max(probs)
        
        return {
            'is_valid': max_prob > threshold,
            'confidence': float(max_prob),
            'prediction': int(np.argmax(probs))
        }