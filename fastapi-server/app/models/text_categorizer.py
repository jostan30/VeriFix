from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.pipeline import Pipeline
import joblib
import os

class TextCategorizer:
    def __init__(self, model_type='rf'):
        self.model_type = model_type
        if model_type == 'rf':
            classifier = RandomForestClassifier(n_estimators=100, random_state=42)
        else:  # decision tree
            classifier = DecisionTreeClassifier(random_state=42)
            
        self.pipeline = Pipeline([
            ('tfidf', TfidfVectorizer(max_features=5000, stop_words='english')),
            ('classifier', classifier)
        ])
        
    def train(self, texts, labels):
        self.pipeline.fit(texts, labels)
        
    def predict(self, texts):
        return self.pipeline.predict(texts)
    
    def predict_proba(self, texts):
        return self.pipeline.predict_proba(texts)
    
    def save_model(self, filepath):
        joblib.dump(self.pipeline, filepath)
        
    def load_model(self, filepath):
        if os.path.exists(filepath):
            self.pipeline = joblib.load(filepath)
            return True
        return False