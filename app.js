const video = document.getElementById('camera');
const captureBtn = document.getElementById('capture');
const autoBtn = document.getElementById('auto');
const finishBtn = document.getElementById('finish');
const countText = document.getElementById('count');
const switchBtn = document.getElementById('switch');
const startBtn = document.getElementById('start');

let images = [];
let autoMode = false;
let interval;
let currentFacing = "environment";
let stream;

// запуск камеры (ТОЛЬКО после клика)
async function startCamera() {
  try {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }

    stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: currentFacing,
        width: { ideal: 1280 },
        height: { ideal: 720 }
      },
      audio: false
    });

    video.srcObject = stream;

  } catch (err) {
    alert("❌ Камера не запустилась. Открой в Safari и дай доступ.");
    console.error(err);
  }
}

// кнопка запуска
startBtn.onclick = () => {
  startCamera();
  startBtn.style.display = "none";
};

// переключение камеры
switchBtn.onclick = () => {
  currentFacing = currentFacing === "environment" ? "user" : "environment";
  startCamera();
};

// захват
function capture() {
  if (!video.videoWidth) return;

  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0, 0);

  images.push(canvas.toDataURL("image/jpeg", 0.8));
  countText.innerText = images.length;
}

captureBtn.onclick = capture;

// авто
autoBtn.onclick = () => {
  autoMode = !autoMode;

  if (autoMode) {
    autoBtn.innerText = "STOP";
    interval = setInterval(capture, 800);
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
