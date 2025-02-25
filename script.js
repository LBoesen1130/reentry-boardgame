// Game state
const gameState = {
  money: 200,
  actionPoints: 3,
  housing: "Halfway House",
  employment: "None",
  legalStatus: "On Parole",
  position: 0,
  violationPoints: 0,
  stabilityMeters: {
    housing: 10,
    employment: 0,
    health: 50,
    support: 20
  },
  turn: 1,
  paroleMeetingAttended: false
};

// DOM Elements
const boardContainer = document.getElementById("board-container");
const diceRollBtn = document.getElementById("roll-dice-btn");
const diceResult = document.getElementById("dice-result");

// Game board spaces
const boardSpaces = [
  { type: "start", name: "Start" },
  { type: "employment", name: "Job Fair" },
  { type: "legal", name: "Fees Due" },
  { type: "community", name: "Family Support" },
  { type: "setback", name: "Parole Check" },
  { type: "opportunity", name: "Job Interview" },
  { type: "setback", name: "Unexpected Expense" },
  { type: "community", name: "Support Group" },
  { type: "employment", name: "Training Program" },
  { type: "setback", name: "Health Issue" },
  { type: "legal", name: "Court Date" },
  { type: "community", name: "Mentor Meeting" },
  { type: "opportunity", name: "New Housing" },
  { type: "employment", name: "Promotion" },
  { type: "setback", name: "Parole Violation Risk" },
  { type: "opportunity", name: "College Enrollment" },
  { type: "community", name: "Religious Support" },
  { type: "legal", name: "Probation Review" },
  { type: "setback", name: "Missed Appointment" },
  { type: "opportunity", name: "Career Fair" }
];

// Function to roll dice and move player
function rollDice() {
  const roll = Math.floor(Math.random() * 6) + 1;
  diceResult.textContent = `You rolled a ${roll}!`;
  movePlayer(roll);
}

diceRollBtn.addEventListener("click", rollDice);

// Function to move player
function movePlayer(roll) {
  gameState.position = (gameState.position + roll) % boardSpaces.length;
  updateBoard();
  checkSpaceEffect();
  checkGameOver();
}

// Function to update board
function updateBoard() {
  boardContainer.innerHTML = "";
  boardSpaces.forEach((space, index) => {
    const spaceEl = document.createElement("div");
    spaceEl.className = `board-space space-${space.type}`;
    spaceEl.textContent = space.name;
    if (index === gameState.position) {
      spaceEl.classList.add("active");
    }
    boardContainer.appendChild(spaceEl);
  });
}

// Function to handle space effects
function checkSpaceEffect() {
  const currentSpace = boardSpaces[gameState.position];
  let message = `You landed on ${currentSpace.name}.`;
  switch (currentSpace.type) {
    case "employment":
      gameState.stabilityMeters.employment += 10;
      message += " Your employment stability increased.";
      break;
    case "legal":
      gameState.violationPoints++;
      message += " You encountered a legal issue, increasing your violations.";
      break;
    case "community":
      gameState.stabilityMeters.support += 5;
      message += " Your support network grew.";
      break;
    case "setback":
      gameState.money -= 50;
      message += " A financial setback occurred.";
      break;
    case "opportunity":
      gameState.money += 100;
      gameState.stabilityMeters.housing += 10;
      message += " You found a great opportunity and gained stability!";
      break;
  }
  showNotification(message, "info");
}

// Function to check win/loss conditions
function checkGameOver() {
  if (gameState.violationPoints >= 3) {
    showNotification("Game Over: You violated parole too many times and were reincarcerated.", "danger");
    resetGame();
  } else if (
    gameState.stabilityMeters.housing >= 80 &&
    gameState.stabilityMeters.employment >= 80 &&
    gameState.stabilityMeters.health >= 80 &&
    gameState.stabilityMeters.support >= 80
  ) {
    showNotification("Congratulations! You've successfully reintegrated into society!", "success");
    resetGame();
  }
}

// Function to reset the game
function resetGame() {
  setTimeout(() => {
    gameState.position = 0;
    gameState.money = 200;
    gameState.stabilityMeters = {
      housing: 10,
      employment: 0,
      health: 50,
      support: 20
    };
    gameState.violationPoints = 0;
    updateBoard();
    showNotification("New game started! Try again!", "info");
  }, 3000);
}

// Function to show notifications
function showNotification(message, type) {
  alert(message);
}

// Initialize game
updateBoard();
