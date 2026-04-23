const video = document.getElementById('camera');
const captureBtn = document.getElementById('capture');
const autoBtn = document.getElementById('auto');
const finishBtn = document.getElementById('finish');
const countText = document.getElementById('count');

let images = [];
let autoMode = false;
let interval;

// камера
navigator.mediaDevices.getUserMedia({
  video: {
    facingMode: { exact: "environment" }
  }
})
.then(stream => {
  video.srcObject = stream;
})
.catch(err => {
  console.log("Ошибка, пробую fallback:", err);

  // fallback если exact не сработал
  return navigator.mediaDevices.getUserMedia({
    video: { facingMode: "environment" }
  }).then(stream => video.srcObject = stream);
});

// сделать кадр
function capture() {
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0, 0);

  const img = canvas.toDataURL("image/jpeg", 0.8);
  images.push(img);

  countText.innerText = "Кадров: " + images.length;
}

captureBtn.onclick = capture;

// авто режим
autoBtn.onclick = () => {
  autoMode = !autoMode;

  if (autoMode) {
    autoBtn.innerText = "⏹ Стоп";
    interval = setInterval(capture, 700);
  } else {
    autoBtn.innerText = "🎥 Авто";
    clearInterval(interval);
  }
};

// завершение
finishBtn.onclick = () => {
  localStorage.setItem("scanData", JSON.stringify(images));
  alert("Сканирование завершено!");
  window.location.href = "viewer.html";
};
