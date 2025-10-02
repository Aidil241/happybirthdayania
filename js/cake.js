document.addEventListener("DOMContentLoaded", () => {
  const candle = document.querySelector(".candle");
  const popup = document.getElementById("popup");
  const closeBtn = document.getElementById("ClosePopup");

  // Klik lilin → matikan api & tampilkan popup
  candle.addEventListener("click", () => {
    candle.classList.add("off");
    popup.style.display = "flex";
  });

  // Klik tombol tutup
  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });

  // Klik di luar popup-content → popup hilang juga
  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.style.display = "none";
    }
  });
});
