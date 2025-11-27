import { Player } from "./player.js";
import { Obstacle } from "./obstacles.js";
import { Background } from "./background.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let player;
let obstacles = [];
let bg;
let obstacleTimer = 0;
let gameRunning = false;
let gameOver = false;

function initGame() {
  player = new Player(150, canvas.height - 100);
  obstacles = [];
  obstacleTimer = 0;
  bg = new Background(canvas.width, canvas.height);
  gameOver = false;
  gameRunning = true;
  restartBtn.style.display = "none";
  startBtn.style.display = "none";
  gameLoop();
}

// Jump control (PC only)
window.addEventListener("keydown", (e) => {
  if (e.code === "Space") player.jump();
});

function gameLoop() {
  if (!gameRunning) return;

  if (gameOver) {
    drawGameOver();
    restartBtn.style.display = "block";
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Background
  bg.update();
  bg.draw(ctx);

  // Player
  player.update(canvas.height);
  player.draw(ctx);

  // Obstacles
  obstacleTimer++;
  if (obstacleTimer > 90) {
    obstacles.push(new Obstacle(canvas.width, canvas.height));
    obstacleTimer = 0;
  }

  obstacles.forEach((ob, i) => {
    ob.update();
    ob.draw(ctx);

    if (ob.offScreen()) obstacles.splice(i, 1);

    if (ob.collides(player)) {
      gameOver = true;
    }
  });

  requestAnimationFrame(gameLoop);
}

function drawGameOver() {
  ctx.fillStyle = "#ff006e";
  ctx.shadowBlur = 20;
  ctx.shadowColor = "#ff006e";
  ctx.font = "60px Arial";
  ctx.fillText("GAME OVER", canvas.width / 2 - 150, canvas.height / 2 - 20);
}

// Start button
startBtn.addEventListener("click", () => initGame());

// Restart button
restartBtn.addEventListener("click", () => {
  initGame();
});
