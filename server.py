import os
from flask import Flask, render_template, request, jsonify
from tensorflow.keras.preprocessing import image
from tensorflow.keras.models import load_model
import numpy as np
import cv2

app = Flask(__name__)

model = load_model('model/plantDiseaseDetection_model.h5')

class_names = ['Pepper__bell___Bacterial_spot',
 'Pepper__bell___healthy',
 'Potato___Early_blight',
 'Potato___Late_blight',
 'Potato___healthy',
 'Tomato_Bacterial_spot',
 'Tomato_healthy']

@app.route('/')
def index():
    return render_template('index.html')

# Endpoint to handle image upload and prediction
@app.route('/predict', methods=['POST'])
def predict():
    # Receive image file from frontend
    image_file = request.files['image']

    # Read and preprocess the image
    image = cv2.imdecode(np.fromstring(image_file.read(), np.uint8), cv2.IMREAD_COLOR)
    image = cv2.resize(image, (256, 256))  # Resize image
    #do normalization if needed

    # Make predictions
    predictions = model.predict(np.expand_dims(image, axis=0))
    predicted_class_index = np.argmax(predictions)
    predicted_class = class_names[predicted_class_index]

    # Convert predictions to dictionary format for JSON serialization
    confidences = {class_names[i]: float(predictions[0][i]) for i in range(len(class_names))}

    # Return prediction result along with confidences
    return jsonify({'predicted_class': predicted_class, 'confidences': confidences})

    #return jsonify({'predicted_class': predicted_class})
    # return render_template('index.html',prediction='predictoin is ${}'.format(predicted_class))

if __name__ == '__main__':
    app.run(debug=True)