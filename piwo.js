const audio = document.getElementById('audio');
const video = document.getElementById('piwo-video');
const playPauseButton = document.getElementById('play-pause');
const backwardButton = document.getElementById('backward');
const forwardButton = document.getElementById('forward');
const progressSlider = document.getElementById('progress');

let isPlaying = false;

// make sure that video is paused 
video.pause();

// play or pause the audio and video
playPauseButton.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        video.pause();
        playPauseButton.textContent = 'Play';
    } else {
        audio.play();
        video.play();
        playPauseButton.textContent = 'Pause';
    }
    isPlaying = !isPlaying;
});

// backward
backwardButton.addEventListener('click', () => {
    audio.currentTime = Math.max(audio.currentTime - 10, 0);
    video.currentTime = Math.max(video.currentTime - 10, 0);
});

// forward 
forwardButton.addEventListener('click', () => {
    audio.currentTime = Math.min(audio.currentTime + 10, audio.duration);
    video.currentTime = Math.min(video.currentTime + 10, video.duration);
});

// update the slider position 
audio.addEventListener('timeupdate', () => {
    progressSlider.value = (audio.currentTime / audio.duration) * 100;
    if (!video.paused) {
        video.currentTime = audio.currentTime % video.duration;
    }
});

// seek to a specific part of the audio and video using the slider
progressSlider.addEventListener('input', () => {
    const newTime = (progressSlider.value / 100) * audio.duration;
    audio.currentTime = newTime;
    video.currentTime = newTime % video.duration;
});

// reset play button when ends
audio.addEventListener('ended', () => {
    playPauseButton.textContent = 'Play';
    isPlaying = false;
});

// loop the video
video.addEventListener('ended', () => {
    video.currentTime = 0;
    if (isPlaying) {
        video.play();
    }
});