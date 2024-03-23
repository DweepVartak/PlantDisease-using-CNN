// script.js

// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission

    // Get reference to the file input element
    const fileInput = document.getElementById('imageInput');

    // Check if a file is selected
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0]; // Get the selected file
        const formData = new FormData(); // Create a FormData object
        formData.append('image', file); // Append the file to FormData object

        // Send a POST request to the server with FormData
        fetch('/predict', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json()) // Parse response JSON
        .then(data => {
            // Display prediction result
            const resultElement = document.getElementById('result');
            resultElement.innerHTML = `Predicted Class: ${data.predicted_class}`;
              // Display list of confidences
            resultElement.innerHTML += '<h2>Confidences:</h2>';
            const sortedConfidences = Object.entries(data.confidences)
                .sort(([,a], [,b]) => b - a); // Sort confidences in descending order
            sortedConfidences.forEach(([className, confidence]) => {
                const confidencePercent = (confidence * 100).toFixed(1); // Convert confidence to percentage with 1 decimal
                resultElement.innerHTML += `<p>${className}: ${confidencePercent}%</p>`;
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
    } else {
        console.error('No file selected');
    }
}

// Add event listener to form submission
document.getElementById('uploadForm').addEventListener('submit', handleSubmit);
