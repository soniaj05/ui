document.getElementById('transcribeForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const youtubeUrl = document.getElementById('youtubeUrl').value;

    try {
        const response = await fetch('http://127.0.0.1:8000/transcribe/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: youtubeUrl }),
        });

        console.log("Response status:", response.status); // Log the status code
        const rawResponse = await response.text(); // Get the raw response
        console.log("Raw response:", rawResponse); // Log the raw response

        try {
            const data = JSON.parse(rawResponse); // Parse the raw response as JSON
            if (response.ok) {
                document.getElementById('transcriptionResult').innerText = "Transcription completed successfully";

                // Show the "Ask a Question" section
                document.getElementById('askQuestionCard').style.display = 'block';
            } else {
                document.getElementById('transcriptionResult').innerText = 'Error: ' + data.error;
            }
        } catch (jsonError) {
            console.error("JSON parsing error:", jsonError);
            document.getElementById('transcriptionResult').innerText = 'Error: Invalid response from server.';
        }
    } catch (error) {
        document.getElementById('transcriptionResult').innerText = 'Error: ' + error.message;
    }
});

document.getElementById('askQuestionForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const question = document.getElementById('question').value;

    try {
        const response = await fetch('http://127.0.0.1:8000/ask/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question: question }),
        });

        console.log("Response status:", response.status); // Log the status code
        const rawResponse = await response.text(); // Get the raw response
        console.log("Raw response:", rawResponse); // Log the raw response

        try {
            const data = JSON.parse(rawResponse); // Parse the raw response as JSON
            if (response.ok) {
                document.getElementById('answerResult').innerText = data.answer;
            } else {
                document.getElementById('answerResult').innerText = 'Error: ' + data.error;
            }
        } catch (jsonError) {
            console.error("JSON parsing error:", jsonError);
            document.getElementById('answerResult').innerText = 'Error: Invalid response from server.';
        }
    } catch (error) {
        document.getElementById('answerResult').innerText = 'Error: ' + error.message;
    }
});