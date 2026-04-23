// QR код
QRCode.toCanvas(document.getElementById('qr'), window.location.href);

// просто инфо
const data = JSON.parse(localStorage.getItem("scanData") || "[]");
console.log("Кадров снято:", data.length);
