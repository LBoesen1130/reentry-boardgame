// Game state
const gameState = {
    money: 200,
    actionPoints: 3,
    housing: "Halfway House",
    employment: "None",
    legalStatus: "On Parole",
    violationPoints: 0,
    stabilityMeters: {
        housing: 10,
        employment: 0,
        health: 50,
        support: 20
    }
};

// DOM Elements
const moneyValue = document.getElementById("money-value");
const housingValue = document.getElementById("housing-value");
const employmentValue = document.getElementById("employment-value");
const legalValue = document.getElementById("legal-value");
const actionValue = document.getElementById("action-value");

const housingStabilityValue = document.getElementById("housing-stability-value");
const employmentStabilityValue = document.getElementById("employment-stability-value");
const healthStabilityValue = document.getElementById("health-stability-value");
const supportStabilityValue = document.getElementById("support-stability-value");

const notification = document.getElementById("notification");

// Function to update UI
function updateDisplay() {
    moneyValue.textContent = gameState.money;
    housingValue.textContent = gameState.housing;
    employmentValue.textContent = gameState.employment;
    legalValue.textContent = gameState.legalStatus;
    actionValue.textContent = gameState.actionPoints;
    
    housingStabilityValue.textContent = `${gameState.stabilityMeters.housing}%`;
    employmentStabilityValue.textContent = `${gameState.stabilityMeters.employment}%`;
    healthStabilityValue.textContent = `${gameState.stabilityMeters.health}%`;
    supportStabilityValue.textContent = `${gameState.stabilityMeters.support}%`;
}

// Function to show notifications
function showNotification(message, type) {
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.style.display = "block";
    setTimeout(() => { notification.style.display = "none"; }, 3000);
}

// Move player function
function movePlayer() {
    if (gameState.actionPoints > 0) {
        gameState.actionPoints--;
        showNotification("You moved forward.", "success");
        updateDisplay();
    } else {
        showNotification("Not enough action points!", "danger");
    }
}

// Look for job function
function lookForJob() {
    if (gameState.actionPoints >= 2) {
        gameState.actionPoints -= 2;
        gameState.money += 300;
        gameState.stabilityMeters.employment += 10;
        gameState.employment = "Fast Food Worker";
        showNotification("You got a job in fast food!", "success");
        updateDisplay();
    } else {
        showNotification("Not enough action points!", "danger");
    }
}

// Search for housing function
function searchHousing() {
    if (gameState.actionPoints >= 2) {
        if (gameState.money >= 500) {
            gameState.money -= 500;
            gameState.housing = "Apartment";
            gameState.stabilityMeters.housing += 20;
            showNotification("You moved into an apartment!", "success");
        } else {
            showNotification("Not enough money!", "danger");
        }
        gameState.actionPoints -= 2;
        updateDisplay();
    }
}

// Attend parole meeting function
function attendParoleMeeting() {
    if (gameState.actionPoints >= 1) {
        gameState.actionPoints--;
        gameState.violationPoints = Math.max(0, gameState.violationPoints - 1);
        showNotification("You attended your parole meeting.", "success");
        updateDisplay();
    } else {
        showNotification("Not enough action points!", "danger");
    }
}

// Initialize game
updateDisplay();
