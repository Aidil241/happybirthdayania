// ==== GLOBAL MODAL ====
const overlay = document.getElementById("overlay");
const appIcons = document.querySelectorAll(".app-icon");
const closeBtns = document.querySelectorAll("[data-close]");

// buka modal
appIcons.forEach(icon => {
  icon.addEventListener("click", () => {
    const app = icon.dataset.app;
    if (!app) return;

    const modal = document.getElementById("modal" + capitalize(app));
    if (modal) {
      modal.classList.remove("hidden");
      overlay.classList.remove("hidden");

      // khusus game -> inisialisasi puzzle
      if (app === "game") {
        initPuzzle();
      }
    }
  });
});

// tutup modal
closeBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    btn.parentElement.classList.add("hidden");
    overlay.classList.add("hidden");
  });
});

overlay.addEventListener("click", () => {
  document.querySelectorAll(".modal").forEach(m => m.classList.add("hidden"));
  overlay.classList.add("hidden");
});

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ==== LOVE NOTES ====
const notesList = document.getElementById("notesList");
const noteInput = document.getElementById("noteInput");
const addNoteBtn = document.getElementById("addNote");
const clearNotesBtn = document.getElementById("clearNotes");

if (addNoteBtn) {
  addNoteBtn.addEventListener("click", () => {
    const text = noteInput.value.trim();
    if (!text) return;
    const p = document.createElement("p");
    p.textContent = text;
    notesList.appendChild(p);
    noteInput.value = "";
  });
}

if (clearNotesBtn) {
  clearNotesBtn.addEventListener("click", () => {
    notesList.innerHTML = "";
  });
}

// ==== CAKE ====
const blowBtn = document.getElementById("blowBtn");
const flame = document.getElementById("flame");

if (blowBtn) {
  blowBtn.addEventListener("click", () => {
    flame.style.display = "none";
    setTimeout(() => {
      alert("🎂 Happy Birthday! Semoga semua harapanmu terkabul ❤️");
      flame.style.display = "block";
    }, 1000);
  });
}

// ==== COUNTDOWN ====
const setCountdownBtn = document.getElementById("setCountdown");
const dateTarget = document.getElementById("dateTarget");
const timeRemaining = document.getElementById("timeRemaining");
let countdownInterval;

if (setCountdownBtn) {
  setCountdownBtn.addEventListener("click", () => {
    if (countdownInterval) clearInterval(countdownInterval);
    const target = new Date(dateTarget.value).getTime();
    countdownInterval = setInterval(() => {
      const now = new Date().getTime();
      const dist = target - now;
      if (dist <= 0) {
        clearInterval(countdownInterval);
        timeRemaining.textContent = "00:00:00";
        alert("🎉 Waktunya kejutan!");
        return;
      }
      const hrs = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((dist % (1000 * 60)) / 1000);
      timeRemaining.textContent = 
        `${String(hrs).padStart(2,"0")}:${String(mins).padStart(2,"0")}:${String(secs).padStart(2,"0")}`;
    }, 1000);
  });
}

// ==== MUSIC ====
const audioUrl = document.getElementById("audioUrl");
const setAudioBtn = document.getElementById("setAudio");
const audioSource = document.getElementById("audioSource");
const player = document.getElementById("player");

if (setAudioBtn) {
  setAudioBtn.addEventListener("click", () => {
    if (!audioUrl.value.trim()) return;
    audioSource.src = audioUrl.value.trim();
    player.load();
    player.play();
  });
}

// ==== GIFT ====
const openGiftBtn = document.getElementById("openGift");
if (openGiftBtn) {
  openGiftBtn.addEventListener("click", () => {
    confetti();
    alert("🎁 Surprise hadiah untukmu!");
  });
}

// ==== MINI PUZZLE MULTI FOTO ====
const gameBoard = document.getElementById("gameBoard");
const restartGameBtn = document.getElementById("restartGame");
const nextPuzzleBtn = document.getElementById("nextPuzzle");
const finishPuzzleBtn = document.getElementById("finishPuzzle");

let puzzleSize = 3; // 3x3
let firstClick = null;
let currentPuzzle = 0;

// Daftar foto puzzle (ganti dengan fotomu di folder Asset)
const puzzleImages = [
  "Asset/Images/puzzle1.jpeg",
  "Asset/Images/puzzle2.jpg",
  "Asset/Images/puzzle3.jpg"
];

function initPuzzle() {
  gameBoard.innerHTML = "";
  firstClick = null;

  let positions = [];
  for (let i = 0; i < puzzleSize * puzzleSize; i++) {
    positions.push(i);
  }
  shuffleArray(positions);

  positions.forEach((shuffledPos, index) => {
    const piece = document.createElement("div");
    piece.classList.add("puzzlePiece");

    // index asli potongan
    piece.dataset.correct = shuffledPos;
    // posisi sekarang di board
    piece.dataset.index = index;

    const x = (shuffledPos % puzzleSize) * -100;
    const y = Math.floor(shuffledPos / puzzleSize) * -100;
    piece.style.backgroundImage = `url(${puzzleImages[currentPuzzle]})`;
    piece.style.backgroundSize = "300px 300px";
    piece.style.backgroundPosition = `${x}px ${y}px`;

    piece.addEventListener("click", () => handlePuzzleClick(piece));
    gameBoard.appendChild(piece);
  });

  nextPuzzleBtn.classList.add("hidden");
  finishPuzzleBtn.classList.add("hidden");
}

function handlePuzzleClick(piece) {
  if (!firstClick) {
    firstClick = piece;
    piece.style.outline = "2px solid red";
  } else {
    swapPieces(firstClick, piece);
    firstClick.style.outline = "none";
    firstClick = null;
    checkWin();
  }
}

function swapPieces(p1, p2) {
  const temp = p1.dataset.correct;
  p1.dataset.correct = p2.dataset.correct;
  p2.dataset.correct = temp;
  updateBg(p1);
  updateBg(p2);
}

function updateBg(piece) {
  const pos = piece.dataset.correct;
  const x = (pos % puzzleSize) * -100;
  const y = Math.floor(pos / puzzleSize) * -100;
  piece.style.backgroundImage = `url(${puzzleImages[currentPuzzle]})`;
  piece.style.backgroundSize = "300px 300px";
  piece.style.backgroundPosition = `${x}px ${y}px`;
}

function checkWin() {
  const pieces = document.querySelectorAll(".puzzlePiece");
  let correct = true;
  pieces.forEach((piece, index) => {
    if (parseInt(piece.dataset.correct) !== index) correct = false;
  });

  if (correct) {
    setTimeout(() => {
      alert("🎉 Puzzle selesai!");
      if (currentPuzzle < puzzleImages.length - 1) {
        nextPuzzleBtn.classList.remove("hidden");
      } else {
        finishPuzzleBtn.classList.remove("hidden");
      }
    }, 200);
  }
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

if (restartGameBtn) {
  restartGameBtn.addEventListener("click", initPuzzle);
}

if (nextPuzzleBtn) {
  nextPuzzleBtn.addEventListener("click", () => {
    currentPuzzle++;
    initPuzzle();
  });
}

if (finishPuzzleBtn) {
  finishPuzzleBtn.addEventListener("click", () => {
    document.getElementById("modalGame").classList.add("hidden");
    document.getElementById("overlay").classList.add("hidden");
    currentPuzzle = 0;
  });
}

// Buka modal Send Message
document.querySelectorAll("[data-app='sendMessage']").forEach(btn => {
  btn.addEventListener("click", () => {
    document.getElementById("modalSendMessage").classList.remove("hidden");
    document.getElementById("overlay").classList.remove("hidden");
  });
});

const formMsg = document.getElementById("messageForm");
const statusMsg = document.getElementById("formStatus");

if (formMsg) {
  formMsg.addEventListener("submit", async function (e) {
    e.preventDefault();

    const data = new FormData(formMsg);
    const action = formMsg.getAttribute("action");

    try {
      const response = await fetch(action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" }
      });

      if (response.ok) {
        statusMsg.style.display = "block"; // tampilkan pesan sukses
        formMsg.reset();
      } else {
        alert("❌ Pesan gagal dikirim, coba lagi ya.");
      }
    } catch (err) {
      alert("⚠️ Terjadi kesalahan, coba lagi nanti.");
    }
  });
}

