
// TRAINING CONFIGURATION
const sampleBreathy = "sounds/train/example_breathy.wav";
const sampleModal = "sounds/train/example_modal.wav";

const train_breathy = [
  "sounds/train/breathy-1.wav",
  "sounds/train/breathy-2.wav",
  "sounds/train/breathy-3.wav",
  "sounds/train/breathy-4.wav"
];

const train_modal = [
  "sounds/train/modal-1.wav",
  "sounds/train/modal-2.wav",
  "sounds/train/modal-3.wav",
  "sounds/train/modal-4.wav",
];

let correctInARow = 0;
const trainingLogs = [];

function logTrainingResult(firstSound, secondSound, participantAnswer) {
  trainingLogs.push({
    first: firstSound,
    second: secondSound,
    answer: participantAnswer
  });
}

let currentPair = null;

function playSample(type) {
  const sound = type === 'breathy' ? sampleBreathy : sampleModal;
  new Audio(sound).play();
}

function startExperiment(){
  $('#doneWithDebriefing').unbind('click');
  $("#debriefing").hide();
  $("#intro").show();
}

function startTraining() {
  document.getElementById("intro").style.display = "none";
  document.getElementById("training").style.display = "block";
  document.getElementById("fixation").style.display = "none";

  correctInARow = 0;
  presentNewPair();
}

function presentNewPair() {
  const breathySound = train_breathy[Math.floor(Math.random() * train_breathy.length)];
  const modalSound = train_modal[Math.floor(Math.random() * train_modal.length)];
  const isBreathyFirst = Math.random() < 0.5;

  const firstSound = isBreathyFirst ? breathySound : modalSound;
  const secondSound = isBreathyFirst ? modalSound : breathySound;

  currentPair = {
    first: firstSound,
    second: secondSound,
    correct: isBreathyFirst ? "first" : "second"
  };

  const audio1 = new Audio(currentPair.first);
  const audio2 = new Audio(currentPair.second);

  audio1.play();
  audio1.onended = () => {
    setTimeout(() => {
      audio2.play();
    }, 400);
  };
}

function checkTrainingResponse(response) {
  const feedback = document.getElementById("feedback");
  logTrainingResult(currentPair.first, currentPair.second, response);
  if (response === currentPair.correct) {
    correctInARow += 1;
    feedback.textContent = "✅ Correct!";
  } else {
    correctInARow = 0;
    feedback.textContent = "❌ Incorrect. Try again.";
  }
  $("#trialnum").text(correctInARow+"/5");

  if (correctInARow >= 5) {
    document.getElementById("training").style.display = "none";
    document.getElementById("mainTask").style.display = "block";
    $("#continueBtn").on("click", proceedTesting);
  } else {
    setTimeout(() => {
      feedback.textContent = "";
      showFixation();
    }, 1000);
  }
}

function showFixation(){
  $("#fixation").show()
  $("#training").hide()
  setTimeout(() => {
    $("#fixation").hide();
    $("#training").show();
    presentNewPair();
  }, 500);
}

function proceedTesting() {
  $('#continueBtn').unbind('click');
  $("#mainTask").hide();
  $("#ratingTaskPage").show();
}

// TESTING CONFIGURATION
const soundSets = [
  {
    name: "a_male",
    sounds: [
      "0520_a_h1h2_neg1.wav", "0520_a_h1h2_neg11.wav", "0520_a_h1h2_neg21.wav",
      "0520_a_h1h2_pos9.wav", "0520_a_h1h2_pos19.wav", "0520_a_h1h2_pos29.wav",
      "0520_a_h1h2_pos39.wav", "0520_a_h1h2_pos49.wav",
      "0520_a_h2h3_neg1.wav", "0520_a_h2h3_neg11.wav", "0520_a_h2h3_neg21.wav",
      "0520_a_h2h3_pos9.wav", "0520_a_h2h3_pos19.wav", "0520_a_h2h3_pos29.wav",
      "0520_a_h2h3_pos39.wav", "0520_a_h2h3_pos49.wav"
    ]
  },
  {
    name: "a_female",
    sounds: [
      "0520_a_h1h2_neg1.wav", "0520_a_h1h2_neg11.wav", "0520_a_h1h2_neg21.wav",
      "0520_a_h1h2_pos9.wav", "0520_a_h1h2_pos19.wav", "0520_a_h1h2_pos29.wav",
      "0520_a_h1h2_pos39.wav", "0520_a_h1h2_pos49.wav",
      "0520_a_h2h3_neg1.wav", "0520_a_h2h3_neg11.wav", "0520_a_h2h3_neg21.wav",
      "0520_a_h2h3_pos9.wav", "0520_a_h2h3_pos19.wav", "0520_a_h2h3_pos29.wav",
      "0520_a_h2h3_pos39.wav", "0520_a_h2h3_pos49.wav"
    ]
  },
  {
    name: "i_male",
    sounds: [
      "0520_a_h1h2_neg1.wav", "0520_a_h1h2_neg11.wav", "0520_a_h1h2_neg21.wav",
      "0520_a_h1h2_pos9.wav", "0520_a_h1h2_pos19.wav", "0520_a_h1h2_pos29.wav",
      "0520_a_h1h2_pos39.wav", "0520_a_h1h2_pos49.wav",
      "0520_a_h2h3_neg1.wav", "0520_a_h2h3_neg11.wav", "0520_a_h2h3_neg21.wav",
      "0520_a_h2h3_pos9.wav", "0520_a_h2h3_pos19.wav", "0520_a_h2h3_pos29.wav",
      "0520_a_h2h3_pos39.wav", "0520_a_h2h3_pos49.wav"
    ]
  },
  {
    name: "i_female",
    sounds: [
      "0520_a_h1h2_neg1.wav", "0520_a_h1h2_neg11.wav", "0520_a_h1h2_neg21.wav",
      "0520_a_h1h2_pos9.wav", "0520_a_h1h2_pos19.wav", "0520_a_h1h2_pos29.wav",
      "0520_a_h1h2_pos39.wav", "0520_a_h1h2_pos49.wav",
      "0520_a_h2h3_neg1.wav", "0520_a_h2h3_neg11.wav", "0520_a_h2h3_neg21.wav",
      "0520_a_h2h3_pos9.wav", "0520_a_h2h3_pos19.wav", "0520_a_h2h3_pos29.wav",
      "0520_a_h2h3_pos39.wav", "0520_a_h2h3_pos49.wav"
    ]
  },
  {
    name: "e_male",
    sounds: [
      "0520_a_h1h2_neg1.wav", "0520_a_h1h2_neg11.wav", "0520_a_h1h2_neg21.wav",
      "0520_a_h1h2_pos9.wav", "0520_a_h1h2_pos19.wav", "0520_a_h1h2_pos29.wav",
      "0520_a_h1h2_pos39.wav", "0520_a_h1h2_pos49.wav",
      "0520_a_h2h3_neg1.wav", "0520_a_h2h3_neg11.wav", "0520_a_h2h3_neg21.wav",
      "0520_a_h2h3_pos9.wav", "0520_a_h2h3_pos19.wav", "0520_a_h2h3_pos29.wav",
      "0520_a_h2h3_pos39.wav", "0520_a_h2h3_pos49.wav"
    ]
  },
  {
    name: "e_female",
    sounds: [
      "0520_a_h1h2_neg1.wav", "0520_a_h1h2_neg11.wav", "0520_a_h1h2_neg21.wav",
      "0520_a_h1h2_pos9.wav", "0520_a_h1h2_pos19.wav", "0520_a_h1h2_pos29.wav",
      "0520_a_h1h2_pos39.wav", "0520_a_h1h2_pos49.wav",
      "0520_a_h2h3_neg1.wav", "0520_a_h2h3_neg11.wav", "0520_a_h2h3_neg21.wav",
      "0520_a_h2h3_pos9.wav", "0520_a_h2h3_pos19.wav", "0520_a_h2h3_pos29.wav",
      "0520_a_h2h3_pos39.wav", "0520_a_h2h3_pos49.wav"
    ]
  }
];

let currentSetIndex = 0;
let currentSoundSet = soundSets[currentSetIndex];
let sounds = [...currentSoundSet.sounds];
const originalSounds = [...sounds];
sounds = sounds.map(filename => "sounds/test/" + filename);

// Global array to store data across sound sets
let allSetData = [];

const colors = [
  "#e6194b", "#3cb44b", "#ffe119", "#4363d8", "#f58231", "#911eb4",
  "#46f0f0", "#f032e6", "#bcf60c", "#fabebe", "#008080", "#e6beff",
  "#9a6324", "#fffac8", "#800000", "#aaffc3"
];

// Shuffle sounds independently
for (let i = sounds.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [sounds[i], sounds[j]] = [sounds[j], sounds[i]];
}

// Shuffle colors independently
for (let i = colors.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [colors[i], colors[j]] = [colors[j], colors[i]];
}

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

function setupSoundIcon(index) {
  soundIcon.dataset.sound = sounds[index];
  soundIcon.dataset.color = colors[index];
  soundIcon.dataset.order = index + 1;
  soundIcon.innerText = "🔊";
  soundIcon.style.backgroundColor = colors[index];
  soundIcon.style.width = "36px";
  soundIcon.style.height = "36px";
  soundIcon.style.display = "flex";
  soundIcon.style.alignItems = "center";
  soundIcon.style.justifyContent = "center";
  soundIcon.style.fontSize = "30px";
}

function resetSoundSet() {
  // Collect current set data
  const dropRect = dropZone.getBoundingClientRect();
  const currentSetData = [];

  // Collect placed icons
  dropZone.querySelectorAll(".draggable").forEach(icon => {
    const iconRect = icon.getBoundingClientRect();
    const xCenter = (iconRect.left + iconRect.width / 2) - dropRect.left;
    const yCenter = (iconRect.top + iconRect.height / 2) - dropRect.top;
    const x = xCenter / dropRect.width;
    const y = 1 - (yCenter / dropRect.height);
    
    currentSetData.push({
      name: icon.dataset.sound.replace("sounds/test/", ""),
      x: x.toFixed(6),
      y: y.toFixed(6),
      color: icon.dataset.color,
      order: icon.dataset.order,
      soundSet: currentSoundSet.name
    });
  });

  // If no icons placed, add placeholder data
  if (currentSetData.length === 0) {
    currentSoundSet.sounds.forEach(name => {
      currentSetData.push({
        name: name,
        x: "NA",
        y: "NA",
        color: "NA",
        order: "NA",
        soundSet: currentSoundSet.name
      });
    });
  }

  // Store the current set's data
  allSetData.push(...currentSetData);

  // Move to next sound set
  currentSetIndex++;
  if (currentSetIndex >= soundSets.length) {
    // All sets completed, export final CSV and end experiment
    exportCSV();
    alert("Experiment completed!");
    return false;
  }

  // Reset for new sound set
  currentSoundSet = soundSets[currentSetIndex];
  sounds = [...currentSoundSet.sounds];
  sounds = sounds.map(filename => "sounds/test/" + filename);

  // Shuffle sounds and colors
  for (let i = sounds.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [sounds[i], sounds[j]] = [sounds[j], sounds[i]];
  }

  for (let i = colors.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [colors[i], colors[j]] = [colors[j], colors[i]];
  }

  // Clear drop zone
  dropZone.innerHTML = '';

  // Reset current index
  currentIndex = 0;
  setupSoundIcon(currentIndex);

  // Reset sound panel
  const soundPanel = document.querySelector(".sound-panel");
  soundPanel.innerHTML = '';
  const newIcon = soundIcon.cloneNode(true);
  newIcon.addEventListener("click", function () {
    playSpecificSound(newIcon.dataset.sound);
  });
  newIcon.addEventListener("dragstart", function (e) {
    draggedElement = e.target;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
  });
  soundPanel.appendChild(newIcon);

  // Update button text
  const submitBtn = document.getElementById("submitBtn");
  if (currentSetIndex === soundSets.length - 1) {
    submitBtn.textContent = "Submit";
  } else {
    submitBtn.textContent = "Continue";
  }

  return true;
}

setupSoundIcon(currentIndex);

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

  // Check if dragging from outside drop zone
  if (!dropZone.contains(draggedElement)) {
    const clone = draggedElement.cloneNode(true);
    clone.style.position = "absolute";
    clone.style.left = `${x}px`;
    clone.style.top = `${y}px`;

    clone.addEventListener("click", () => 
      playSpecificSound(clone.dataset.sound)
    );
    clone.addEventListener("dragstart", e => {
      draggedElement = e.target;
      offsetX = e.offsetX;
      offsetY = e.offsetY;
    });

    dropZone.appendChild(clone);

    // Remove the top icon if it matches
    const topIcon = document.querySelector(".sound-panel .draggable");
    if (topIcon && topIcon.dataset.sound === draggedElement.dataset.sound) {
      topIcon.remove();
    }

    // Advance to next sound if possible
    if (currentIndex < sounds.length - 1) {
      currentIndex++;
      setupSoundIcon(currentIndex);
      
      const newIcon = soundIcon.cloneNode(true);
      newIcon.addEventListener("click", function () {
        playSpecificSound(newIcon.dataset.sound);
      });
      newIcon.addEventListener("dragstart", function (e) {
        draggedElement = e.target;
        offsetX = e.offsetX;
        offsetY = e.offsetY;
      });
      
      document.querySelector(".sound-panel").appendChild(newIcon);
    }
  } else {
    // If dragging within drop zone, just update position
    const iconWidth = draggedElement.offsetWidth;
    const iconHeight = draggedElement.offsetHeight;
    const clampedX = Math.max(0, Math.min(x, dropRect.width - iconWidth));
    const clampedY = Math.max(0, Math.min(y, dropRect.height - iconHeight));

    draggedElement.style.left = `${clampedX}px`;
    draggedElement.style.top = `${clampedY}px`;
  }
});

// Add event listener for Continue/End button
document.getElementById("submitBtn").addEventListener("click", function() {
  if (resetSoundSet()) {
    // Additional actions after resetting sound set if needed
  }
});

function exportCSV() {
  // Prepare CSV header
  const headers = [
    "sound", "x_normalized", "y_normalized", "color", "order", 
    "first_sound", "second_sound", "participant_answer", "experiment", 
    "sound_set"
  ];

  // Prepare rows with sound placement data
  const dataRows = allSetData.map(item => [
    item.name, 
    item.x, 
    item.y, 
    item.color, 
    item.order, 
    "NA", 
    "NA", 
    "NA", 
    "test", 
    item.soundSet
  ]);

  // Add training logs rows
  const trainingRows = trainingLogs.map(log => [
    "NA", "NA", "NA", "NA", "NA", 
    log.first, 
    log.second, 
    log.answer, 
    "train", 
    "NA"
  ]);

  // Combine all rows
  const rows = [headers, ...dataRows, ...trainingRows];

  // Create CSV content
  const csvContent = rows.map(e => e.join(",")).join("\n");

  // Create and download CSV file
  const filename = $("#subjectid").val() + ".csv";
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
