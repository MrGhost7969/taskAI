from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report
from flask import Flask, request, jsonify
import requests
import pickle
import re

app = Flask(__name__)
# Make a request to the API to retrieve the text response
api_response = requests.post('http://localhost:5000/chat', data={'textInput': 'textInput'}).json()['message']

# Preprocess the text
# (Assuming you have a function called preprocess_text)
def preprocess_text(text):
    text = text.lower()
    text = re.sub(r'[.,\/#!$%\^&\*;:{}=\-_`~()]', '', text)
    text = re.sub(r'\s{2,}', ' ', text)
    return text

preprocessed_text = preprocess_text(api_response)

# Vectorize the preprocessed text using the same vectorizer used during training
vectorizer = TfidfVectorizer()
text_vector = vectorizer.transform([preprocessed_text])

# Make a prediction using the trained logistic regression model
model = LogisticRegression()
prediction = model.predict(text_vector)
print(prediction)
@app.route('/predict', methods=["POST"])
def predict():
    return jsonify({'prediction': prediction})

if __name__ == '__main__':
    app.run(debug=True)