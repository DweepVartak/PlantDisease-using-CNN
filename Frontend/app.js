$(document).ready(function() {
    $('#uploadForm').submit(function(e) {
        e.preventDefault();

        var formData = new FormData();
        formData.append('image', $('#imageInput')[0].files[0]);

        $.ajax({
            type: 'POST',
            url: '/upload',
            data: formData,
            contentType: false,
            processData: false,
            success: function(response) {
                $('#result').html(`<p>Class: ${response.class}</p><p>Confidence: ${response.confidence}</p>`);
            },
            error: function(xhr, status, error) {
                console.error('Error:', error);
            }
        });
    });
});
