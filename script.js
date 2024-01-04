const apiKey = "AIzaSyBr6DFzEx54hznXvYw8eBdKXpg4GEGhD4I";

const BASE_URL = "https://www.googleapis.com/youtube/v3";

window.addEventListener("load", () => {
    // Fetch 20 videos on page load
    searchVideos();
});

function searchVideos() {
    const searchInput = document.getElementById('searchInput').value;
    const apiUrl = `${BASE_URL}/search?key=${apiKey}&part=snippet&type=video&q=${searchInput}&maxResults=20`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => renderVideoList(data.items))
        .catch(error => console.error('Error fetching videos:', error));
}

function renderVideoList(videos) {
    const videoListContainer = document.getElementById('videoList');
    videoListContainer.innerHTML = '';

    videos.forEach(video => {
        const videoItem = document.createElement('div');
        videoItem.classList.add('video-item');
        videoItem.innerHTML = `
            <img onclick="showVideoDetails('${video.id.videoId}')" src="${video.snippet.thumbnails.default.url}" alt="${video.snippet.title}">
            <h3>${video.snippet.title}</h3>
            <p>${video.snippet.description}</p>
            <button onclick="showVideoDetails('${video.id.videoId}')">View Details</button>
        `;
        videoListContainer.appendChild(videoItem);
    });
}

function showVideoDetails(videoId) {
    // Store videoId in localStorage or sessionStorage
    localStorage.setItem('currentVideoId', videoId);

    // Redirect to videoDetails.html
    window.location.href = 'videoDetails.html';
}

async function getVideoStats(videoId){
    // https://www.googleapis.com/youtube/v3/videos?key=AIzaSyBmOfUnRNYc22e04ZmK79uRbPb6388K9AE&part=statistics&id=JhIBqykjzbs
    const response = await fetch(`${BASE_URL}/videos?key=${apiKey}&part=statistics&id=${videoId}`);
    const data = await response.json();
    console.log(data);
}

// viewCount

async function getChannelLogo(channelId){
    // https://www.googleapis.com/youtube/v3/channels?key=AIzaSyBmOfUnRNYc22e04ZmK79uRbPb6388K9AE&part=snippet&id=UC8Wd_RVw8T1O1_IWEbICkIg
    const response = await fetch(`${BASE_URL}/channels?key=${apiKey}&part=snippet&id=${channelId}`);
    const data = await response.json();
    console.log(data);
}

// getVideoStats('3YJvtBqhEJ0');
// if you want to pass multiple query params
// 

// snippet gives me video infomation as well

async function getComments(videoId){
    const response = await fetch(`${BASE_URL}/commentThreads?key=${apiKey}&videoId=${videoId}&maxResults=25&part=snippet`);
    const data = await response.json();
    console.log(data);
}

getComments('Kwu1yIC-ssg');

// items.map
// for each and every item
// snippet.topLevelComment.snippet.textDisplay