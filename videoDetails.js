const apiKey = "AIzaSyBr6DFzEx54hznXvYw8eBdKXpg4GEGhD4I";
const BASE_URL = "https://www.googleapis.com/youtube/v3";

window.addEventListener("load", () => {
  // Load the YouTube video player
  let videoId = "25T8Bj_WQbY";
  if (YT) {
    new YT.Player('video-container', {
      height: "500",
      width: "1500",
      videoId,
    });
  }

  // Load video details
  loadVideoDetails();
});

async function loadVideoDetails() {
  const videoId = localStorage.getItem('currentVideoId');

  try {
    // Fetch video details
    const videoDetailsUrl = `${BASE_URL}/videos?key=${apiKey}&part=snippet&id=${videoId}`;
    const videoDetailsResponse = await fetch(videoDetailsUrl);

    if (!videoDetailsResponse.ok) {
      throw new Error(`Video details request failed with status: ${videoDetailsResponse.status}`);
    }

    const videoDetailsData = await videoDetailsResponse.json();

    // Render video details
    const videoDetailsContainer = document.getElementById('videoDetails');
    if (videoDetailsContainer) {
      renderVideoDetails(videoDetailsData.items[0].snippet);
    } else {
      console.error('Video details container not found.');
    }
  } catch (error) {
    console.error('Error loading video details:', error);
  }
}

function renderVideoDetails(snippet) {
  const videoDetailsContainer = document.getElementById('videoDetails');
  if (videoDetailsContainer) {
    videoDetailsContainer.innerHTML = `
      <h2>${snippet.title}</h2>
      <p>${snippet.description}</p>
      <!-- Add other details as needed -->
    `;
  } else {
    console.error('Video details container not found.');
  }
}
