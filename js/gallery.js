const images = document.querySelectorAll(".gallery-container img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentIndex = 0;

// buka lightbox
images.forEach((img, index) => {
  img.addEventListener("click", () => {
    lightbox.classList.remove("hidden");
    lightboxImg.src = img.src;
    currentIndex = index;
  });
});

// tutup lightbox
closeBtn.addEventListener("click", () => {
  lightbox.classList.add("hidden");
});

// tombol prev/next
function showImage(index) {
  currentIndex = (index + images.length) % images.length;
  lightboxImg.src = images[currentIndex].src;
}

prevBtn.addEventListener("click", () => showImage(currentIndex - 1));
nextBtn.addEventListener("click", () => showImage(currentIndex + 1));

// tutup jika klik background
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.classList.add("hidden");
  }
});

// === Swipe Gesture Support ===
let startX = 0;
lightbox.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

lightbox.addEventListener("touchend", (e) => {
  let endX = e.changedTouches[0].clientX;
  let diff = startX - endX;

  if (Math.abs(diff) > 50) { // minimal 50px geser
    if (diff > 0) {
      // geser kiri -> next
      showImage(currentIndex + 1);
    } else {
      // geser kanan -> prev
      showImage(currentIndex - 1);
    }
  }
});
