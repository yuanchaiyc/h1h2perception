let sounds = [
  "0520_a_h1h2_neg1.wav", "0520_a_h1h2_neg11.wav", "0520_a_h1h2_neg21.wav",
  "0520_a_h1h2_pos9.wav", "0520_a_h1h2_pos19.wav", "0520_a_h1h2_pos29.wav",
  "0520_a_h1h2_pos39.wav", "0520_a_h1h2_pos49.wav",
  "0520_a_h2h3_neg1.wav", "0520_a_h2h3_neg11.wav", "0520_a_h2h3_neg21.wav",
  "0520_a_h2h3_pos9.wav", "0520_a_h2h3_pos19.wav", "0520_a_h2h3_pos29.wav",
  "0520_a_h2h3_pos39.wav", "0520_a_h2h3_pos49.wav"
];

const originalSounds = [...sounds];
sounds = sounds.map(filename => "sounds/" + filename);

const colors = [
  "#e6194b", "#3cb44b", "#ffe119", "#4363d8", "#f58231", "#911eb4",
  "#46f0f0", "#f032e6", "#bcf60c", "#fabebe", "#008080", "#e6beff",
  "#9a6324", "#fffac8", "#800000", "#aaffc3"
];

// Shuffle both sounds and colors
for (let i = sounds.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [sounds[i], sounds[j]] = [sounds[j], sounds[i]];
  [colors[i], colors[j]] = [colors[j], colors[i]];
}

// Build order mapping: sound filename → order
const orderMap = {};
sounds.forEach((s, i) => {
  orderMap[s] = i + 1;
});

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
soundIcon.dataset.color = colors[currentIndex];
soundIcon.dataset.order = currentIndex + 1;
soundIcon.innerText = "🔊";
soundIcon.style.backgroundColor = colors[currentIndex];
soundIcon.style.width = "36px";
soundIcon.style.height = "36px";
soundIcon.style.display = "flex";
soundIcon.style.alignItems = "center";
soundIcon.style.justifyContent = "center";
soundIcon.style.fontSize = "30px";

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
    newIcon.setAttribute("draggable", true);
    newIcon.dataset.sound = sounds[currentIndex];
    newIcon.dataset.color = colors[currentIndex];
    newIcon.dataset.order = currentIndex + 1;
    newIcon.innerText = "🔊";
    newIcon.style.backgroundColor = colors[currentIndex];
    newIcon.style.width = "36px";
    newIcon.style.height = "36px";
    newIcon.style.display = "flex";
    newIcon.style.alignItems = "center";
    newIcon.style.justifyContent = "center";
    newIcon.style.fontSize = "30px";

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
  const dropRect = dropZone.getBoundingClientRect();
  const rows = [["sound", "x_normalized", "y_normalized", "color", "order"]];
  const placed = {};

  // Collect placed icons into a map
  dropZone.querySelectorAll(".draggable").forEach(icon => {
    const iconRect = icon.getBoundingClientRect();
    const xCenter = (iconRect.left + iconRect.width / 2) - dropRect.left;
    const yCenter = (iconRect.top + iconRect.height / 2) - dropRect.top;
    const x = xCenter / dropRect.width;
    const y = 1 - (yCenter / dropRect.height);
    placed[icon.dataset.sound] = {
      x: x.toFixed(6),
      y: y.toFixed(6),
      color: icon.dataset.color,
      order: icon.dataset.order
    };
  });

  // Output sounds in original filename order
  originalSounds.forEach(name => {
    const full = "sounds/" + name;
    if (placed[full]) {
      const p = placed[full];
      rows.push([name, p.x, p.y, p.color, p.order]);
    } else {
      rows.push([name, "", "", "", ""]);
    }
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
