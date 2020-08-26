// eslint-disable-next-line max-classes-per-file
export default class SlowColorwheel {
  static name = 'Slow Colorwheel';

  constructor(controller) {
    this.controller = controller;
    this.interval = 100;
    this.color = 0;
    this.timeNow = Date.now();
  }

  draw() {
    // eslint-disable-next-line no-unused-vars
    const { ctx, width, height } = this.controller;
    // ctx.filter = 'blur(20px)';
    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.fillStyle = `hsl(${this.color}, 100%, 50%)`;
    ctx.fill();
    ctx.font = '15px Arial';
    ctx.fillStyle = 'white';
    // ctx.fillText(Date.now() - this.timeNow, 0, height);
    ctx.fillText(this.color, 0, height);
    if (Date.now() - this.timeNow > this.interval) {
      this.color += 1;
      this.timeNow = Date.now();
    }
    if (this.color >= 360) this.color = 0;
  }
}
