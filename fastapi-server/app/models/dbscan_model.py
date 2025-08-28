import numpy as np
from sklearn.cluster import DBSCAN
from sklearn.preprocessing import StandardScaler
import pandas as pd

class DBSCANModel:
    def __init__(self, eps=0.5, min_samples=5):
        self.eps = eps
        self.min_samples = min_samples
        self.scaler = StandardScaler()
        self.model = None
        
    def fit(self, data):
        # Preprocess data
        scaled_data = self.scaler.fit_transform(data)
        
        # Fit DBSCAN
        self.model = DBSCAN(eps=self.eps, min_samples=self.min_samples)
        clusters = self.model.fit_predict(scaled_data)
        
        return clusters
    
    def predict(self, data):
        if self.model is None:
            raise ValueError("Model not fitted yet")
        
        scaled_data = self.scaler.transform(data)
        return self.model.fit_predict(scaled_data)