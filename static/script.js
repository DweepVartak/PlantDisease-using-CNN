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
