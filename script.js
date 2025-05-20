let sounds = ['0520_a_h1h2_neg1.wav', '0520_a_h1h2_neg11.wav', '0520_a_h1h2_neg21.wav', '0520_a_h1h2_pos9.wav', '0520_a_h1h2_pos19.wav', '0520_a_h1h2_pos29.wav', '0520_a_h1h2_pos39.wav', '0520_a_h1h2_pos49.wav', '0520_a_h2h3_neg1.wav', '0520_a_h2h3_neg11.wav', '0520_a_h2h3_neg21.wav', '0520_a_h2h3_pos9.wav', '0520_a_h2h3_pos19.wav', '0520_a_h2h3_pos29.wav', '0520_a_h2h3_pos39.wav', '0520_a_h2h3_pos49.wav'];

sounds = sounds.map(filename => "sounds/" + filename)
               .sort(() => Math.random() - 0.5);

let currentIndex = 0;

function playSpecificSound(path) {
  const audio = new Audio(path);
  audio.currentTime = 0;
  audio.play();
}

const soundIcon = document.getElementById("soundIcon");
const dropZone = document.getElementById("dropZone");

let draggedElement = null;
let offsetX = 0;
let offsetY = 0;

soundIcon.dataset.sound = sounds[currentIndex];

soundIcon.addEventListener("dragstart", function (e) {
  draggedElement = e.target;
  offsetX = e.offsetX;
  offsetY = e.offsetY;
});

soundIcon.addEventListener("click", function () {
  playSpecificSound(soundIcon.dataset.sound);
});

dropZone.addEventListener("dragover", function (e) {
  e.preventDefault();
});

dropZone.addEventListener("drop", function (e) {
  e.preventDefault();
  const dropRect = dropZone.getBoundingClientRect();
  const x = e.clientX - dropRect.left - offsetX;
  const y = e.clientY - dropRect.top - offsetY;

  if (!dropZone.contains(draggedElement)) {
    dropZone.appendChild(draggedElement);
  }

  draggedElement.style.left = `${x}px`;
  draggedElement.style.top = `${y}px`;

  if (currentIndex < sounds.length - 1) {
    currentIndex++;
    const newIcon = document.createElement("div");
    newIcon.className = "draggable";
    newIcon.innerText = "🔊";
    newIcon.setAttribute("draggable", true);
    newIcon.dataset.sound = sounds[currentIndex];

    newIcon.addEventListener("click", function () {
      playSpecificSound(newIcon.dataset.sound);
    });
    newIcon.addEventListener("dragstart", function (e) {
      draggedElement = e.target;
      offsetX = e.offsetX;
      offsetY = e.offsetY;
    });
    document.querySelector(".sound-panel").appendChild(newIcon);
  } else {
    currentIndex++;
  }
});

function exportCSV() {
  const icons = dropZone.querySelectorAll(".draggable");
  const boxWidth = dropZone.offsetWidth;
  const boxHeight = dropZone.offsetHeight;
  const rows = [["sound", "x_normalized", "y_normalized"]];
  icons.forEach(icon => {
    const sound = icon.dataset.sound;
    const rawX = parseFloat(icon.style.left || "0");
    const rawY = parseFloat(icon.style.top || "0");
    const x = rawX / boxWidth;
    const y = 1 - (rawY / boxHeight);
    rows.push([sound, x.toFixed(6), y.toFixed(6)]);
  });
  const csvContent = rows.map(e => e.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "ratings.csv");
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
