let begin = document.getElementById("Begin");
let rulesLink = document.getElementById("rules-link");
let infoForm = document.getElementById("info-form");
let player;
let userName = document.querySelector(".player-name");
let userChips = document.querySelector(".player-chips");
let openingForm = document.querySelector(".opening-form");
let buttonMessage = document.querySelector("#start");
let gameCount = 0;
let cardSum = 0;
let cardArray = [];
let hasBlackJack = false;
let isAlive = false;
let message = "";
let messageEl = document.querySelector("#message-el");
let sumEL = document.querySelector("#sum-el");
let cardsEL = document.querySelector("#cards-el");
let card = "";

openingForm.addEventListener("submit", function (event) {
  event.preventDefault();
  player = {
    name: userName.value,
    startingChips: userChips.value,
    currentChips: userChips.value,
  };
  begin.classList.add("Begin--close");
  startGame();
});

rulesLink.addEventListener("click", function () {
  infoForm.style.display = "none";
  begin.classList.toggle("Begin--close");
  rulesLink.classList.toggle("rules-link-z-index");
});

let playerEl = document.querySelector("#player-el");
let finalMessage = document.querySelector("#final-message");
playerEl.textContent = player.name + ": $" + player.currentChips;

function randomNumber(ourMin, ourMax) {
  return Math.floor(Math.random() * (ourMax - ourMin + 1)) + ourMin;
}

function startGame() {
  buttonMessage.textContent = "START GAME";
  finalMessage.textContent = "";
  hasBlackJack = false;
  if (hasBlackJack || isAlive == false) {
    let card1 = randomNumber(2, 11);
    let card2 = randomNumber(2, 11);
    cardSum = card1 + card2;
    cardArray = [card1, card2];
    isAlive = true;
    renderGame();
    isAlive = true;
  }
}

function renderGame() {
  sumEL.textContent = "Sum: " + cardSum;
  cardsEL.textContent = "Cards: " + cardArray;
  // for (let i = 0; i < cardArray.length; i++) {
  //   cardsEL.textContent += cardArray[i] + " ";
  //}
  if (cardSum < 21) {
    message = "Do you want to draw another card?";
  } else if (cardSum === 21) {
    message = "Congratulations, You've won the game";
    hasBlackJack = true;
    player.currentChips *= 100;
    gameCount++;
  } else {
    message = "You have lost. Do you want to play another round?";
    isAlive = false;
    player.currentChips /= 100;
    gameCount++;
  }
  messageEl.textContent = message;
  playerEl.textContent = player.name + ": $" + player.currentChips;
}
function newCard() {
  if (isAlive && hasBlackJack == false) {
    card = randomNumber(2, 11);
    cardSum += card;
    cardArray.push(card);
    renderGame();
  }
}
function cashOut() {
  if (gameCount > 0) {
    if (hasBlackJack || isAlive == false) {
      const withdraw = player.currentChips - player.startingChips;
      finalMessage.textContent = `
        ${player.name}
         you just ${withdraw > 0 ? "made" : "lost"}
        ${Math.abs(withdraw)}
        $`;
      reset();
    }
  }
}
function reset() {
  cardSum = 0;
  gameCount = 0;
  cardArray = [];
  hasBlackJack = false;
  isAlive = false;
  message = "";
  messageEl.textContent = "";
  sumEL.textContent = "";
  cardsEL.textContent = "";
  playerEl.textContent = "";
  player.currentChips = player.startingChips;
  buttonMessage.textContent = "PLAY AGAIN";
}
