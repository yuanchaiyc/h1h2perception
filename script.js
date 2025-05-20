let sounds = [
  "0520_a_h1h2_neg1.wav", "0520_a_h1h2_neg11.wav", "0520_a_h1h2_neg21.wav",
  "0520_a_h1h2_pos9.wav", "0520_a_h1h2_pos19.wav", "0520_a_h1h2_pos29.wav",
  "0520_a_h1h2_pos39.wav", "0520_a_h1h2_pos49.wav",
  "0520_a_h2h3_neg1.wav", "0520_a_h2h3_neg11.wav", "0520_a_h2h3_neg21.wav",
  "0520_a_h2h3_pos9.wav", "0520_a_h2h3_pos19.wav", "0520_a_h2h3_pos29.wav",
  "0520_a_h2h3_pos39.wav", "0520_a_h2h3_pos49.wav"
];

sounds = sounds.map(filename => "sounds/" + filename).sort(() => Math.random() - 0.5);

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

  // Clamp position to stay within drop zone
  const iconWidth = draggedElement.offsetWidth;
  const iconHeight = draggedElement.offsetHeight;

  const clampedX = Math.max(0, Math.min(x, dropRect.width - iconWidth));
  const clampedY = Math.max(0, Math.min(y, dropRect.height - iconHeight));

  draggedElement.style.left = `${clampedX}px`;
  draggedElement.style.top = `${clampedY}px`;

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
  const dropRect = dropZone.getBoundingClientRect();
  const rows = [["sound", "x_normalized", "y_normalized"]];

  icons.forEach(icon => {
    const iconRect = icon.getBoundingClientRect();
    const xCenter = (iconRect.left + iconRect.width / 2) - dropRect.left;
    const yCenter = (iconRect.top + iconRect.height / 2) - dropRect.top;
    const x = xCenter / dropRect.width;
    const y = 1 - (yCenter / dropRect.height);
    rows.push([icon.dataset.sound, x.toFixed(6), y.toFixed(6)]);
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
