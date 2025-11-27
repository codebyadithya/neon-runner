export class Background {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.stars = [];

    for (let i = 0; i < 60; i++) {
      this.stars.push({
        x: Math.random() * canvasWidth,
        y: Math.random() * canvasHeight,
        size: Math.random() * 2,
        speed: Math.random() * 1 + 0.2
      });
    }
  }

  update() {
    this.stars.forEach((s) => {
      s.x -= s.speed;
      if (s.x < 0) s.x = this.canvasWidth;
    });
  }

  draw(ctx) {
    ctx.fillStyle = "#0ff";
    ctx.shadowBlur = 20;
    ctx.shadowColor = "#0ff";

    this.stars.forEach((s) => {
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fill();
    });
  }
}
