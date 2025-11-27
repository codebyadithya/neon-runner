import { randomRange } from "./utils.js";

export class Obstacle {
  constructor(canvasWidth, canvasHeight) {
    this.width = randomRange(20, 40);
    this.height = randomRange(40, 80);
    this.x = canvasWidth + this.width;
    this.y = canvasHeight - 20 - this.height;
    this.speed = 6;
  }

  update() {
    this.x -= this.speed;
  }

  offScreen() {
    return this.x + this.width < 0;
  }

  draw(ctx) {
    ctx.save();
    ctx.shadowBlur = 20;
    ctx.shadowColor = "#ff006e";
    ctx.fillStyle = "#ff006e";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.restore();
  }

  collides(player) {
    return (
      player.x + player.radius > this.x &&
      player.x - player.radius < this.x + this.width &&
      player.y + player.radius > this.y
    );
  }
}
