export default class Bounce {
  constructor(controller) {
    this.controller = controller;
    this.yPos = 0;
    this.yDir = 1;
    this.xPos = 0;
    this.xDir = 0.5;
  }

  draw() {
    const { ctx, width, height } = this.controller;

    ctx.filter = 'blur(30px)';

    ctx.beginPath();
    ctx.arc(this.xPos, this.yPos, 50, 0, 2 * Math.PI, false);
    ctx.fillStyle = `hsl(${this.yPos % 360}, 100%, 50%)`;
    ctx.fill();

    this.yPos += this.yDir;
    if (this.yPos >= height || this.yPos <= 0) this.yDir *= -1;

    this.xPos += this.xDir;
    if (this.xPos >= width || this.xPos <= 0) this.xDir *= -1;
  }
}
