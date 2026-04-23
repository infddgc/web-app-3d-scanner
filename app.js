const video = document.getElementById('camera');
const captureBtn = document.getElementById('capture');
const autoBtn = document.getElementById('auto');
const finishBtn = document.getElementById('finish');
const countText = document.getElementById('count');
const switchBtn = document.getElementById('switch');

let images = [];
let autoMode = false;
let interval;
let currentFacing = "environment";

// запуск камеры
function startCamera(facing) {
  navigator.mediaDevices.getUserMedia({
    video: { facingMode: facing }
  }).then(stream => {
    video.srcObject = stream;
  });
}

startCamera(currentFacing);

// переключение камеры
switchBtn.onclick = () => {
  currentFacing = currentFacing === "environment" ? "user" : "environment";
  startCamera(currentFacing);
};

// захват кадра
function capture() {
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0, 0);

  const img = canvas.toDataURL("image/jpeg", 0.8);
  images.push(img);

  countText.innerText = images.length;
}

captureBtn.onclick = capture;

// авто режим
autoBtn.onclick = () => {
  autoMode = !autoMode;

  if (autoMode) {
    autoBtn.innerText = "STOP";
    interval = setInterval(capture, 700);
  } else {
    autoBtn.innerText = "AUTO";
    clearInterval(interval);
  }
};

// завершение
finishBtn.onclick = () => {
  localStorage.setItem("scanData", JSON.stringify(images));
  window.location.href = "viewer.html";
};
};
