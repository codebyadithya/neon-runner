export class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 20;
    this.velocityY = 0;
    this.jumpForce = -12;
    this.gravity = 0.6;
    this.grounded = false;
  }

  jump() {
    if (this.grounded) {
      this.velocityY = this.jumpForce;
      this.grounded = false;
    }
  }

  update(canvasHeight) {
    this.velocityY += this.gravity;
    this.y += this.velocityY;

    if (this.y + this.radius >= canvasHeight - 20) {
      this.y = canvasHeight - 20 - this.radius;
      this.grounded = true;
      this.velocityY = 0;
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.shadowBlur = 25;
    ctx.shadowColor = "#00f6ff";
    ctx.fillStyle = "#00f6ff";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}
