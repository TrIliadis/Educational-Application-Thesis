// Add pause/play video button
const video = document.getElementById("myVideo");

var btn = document.getElementById("myBtn");

function pauseVideo() {
  if (video.paused) {
    video.play();
    btn.innerHTML = "Pause";
  } else {
    video.pause();
    btn.innerHTML = "Play";
  }
}
