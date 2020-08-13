// eslint-disable-next-line max-classes-per-file
export default class Blink {
  constructor(controller) {
    this.controller = controller;
    const { width, height } = this.controller;
    this.interval = 1000;

    this.xPos = Math.random() * width;
    this.yPos = Math.random() * height;
    this.color = Math.random() * 360;
    this.timeNow = Date.now();
  }

  draw() {
    // eslint-disable-next-line no-unused-vars
    const { ctx, width, height } = this.controller;
    ctx.filter = 'blur(0px)';
    ctx.beginPath();
    ctx.arc(this.xPos, this.yPos, 20, 0, 2 * Math.PI, false);
    ctx.fillStyle = `hsl(${this.color}, 100%, 50%)`;
    ctx.fill();
    ctx.font = '15px Arial';
    ctx.fillStyle = 'white';
    // ctx.fillText(Date.now() - this.timeNow, 0, height);
    if (Date.now() - this.timeNow > this.interval) {
      this.color = Math.random() * 360;
      this.xPos = Math.random() * width;
      this.yPos = Math.random() * height;
      this.timeNow = Date.now();
    }
  }
}
