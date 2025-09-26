const songs = document.querySelectorAll(".song");
const player = document.getElementById("audioPlayer");
const currentSong = document.getElementById("currentSong");

songs.forEach(song => {
  song.addEventListener("click", () => {
    const src = song.getAttribute("data-src");
    const title = song.querySelector("h3").textContent;
    player.src = src;
    player.play();
    currentSong.textContent = "🎵 " + title;
  });
});
