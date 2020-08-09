export default class AnimationController {
  static FRAMERATE = 30;

  constructor(canvasElement) {
    this.ctx = canvasElement.getContext('2d');
    this.width = canvasElement.width;
    this.height = canvasElement.height;
  }

  draw(showGrid, showPixels) {
    const { ctx, width, height } = this;

    this.clear();

    if (typeof this.animation !== 'undefined') {
      this.animation.draw(ctx, width, height);
    }

    const strip = this.drawPixelGrid(showPixels);
    if (showGrid) this.drawGridLines();

    return strip;
  }

  setAnimation(animation) {
    this.animation = animation;
  }

  clear() {
    const { ctx, width, height } = this;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height);
  }

  drawPixelGrid(showPixels) {
    const { ctx, width, height } = this;

    const cols = 3;
    const rows = 30;

    const cellWidth = width / cols;
    const cellHeight = height / rows;

    const strip = new Array(rows * cols);

    for (let i = 0; i < rows; i += 1) {
      for (let j = 0; j < cols; j += 1) {
        const cell = this.sampleRect(j * cellWidth, i * cellHeight, cellWidth, cellHeight);
        strip[i * cols + j] = [cell.R, cell.G, cell.B];

        if (showPixels && cell.R + cell.G + cell.B > 0) {
          ctx.filter = 'none';
          ctx.fillStyle = `rgb(${cell.R},${cell.G},${cell.B})`;
          ctx.fillRect(j * cellWidth, i * cellHeight, cellWidth, cellHeight);
        }
      }
    }

    return strip;
  }

  drawGridLines() {
    const { ctx, width, height } = this;
    const cols = 3;
    const rows = 30;

    ctx.filter = 'none';
    ctx.strokeStyle = 'white';

    for (let i = 1; i < cols; i += 1) {
      ctx.beginPath();
      const x = i * (width / cols);
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    for (let i = 1; i < rows; i += 1) {
      ctx.beginPath();
      const y = i * (height / rows);
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  }

  sampleRect(x, y, width, height) {
    const { ctx } = this;

    let R = 0; let G = 0; let B = 0; let A = 0;

    const { data } = ctx.getImageData(x, y, width, height);
    const components = data.length;

    for (let i = 0; i < components; i += 4) {
      // A single pixel (R, G, B, A) will take 4 positions in the array:
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];

      // Update components for solid color and alpha averages:
      R += r;
      G += g;
      B += b;
      A += a;
    }

    const pixelsPerChannel = components / 4;

    // The | operator is used here to perform an integer division:
    /* eslint-disable no-bitwise */
    R = R / pixelsPerChannel | 0;
    G = G / pixelsPerChannel | 0;
    B = B / pixelsPerChannel | 0;

    // The alpha channel need to be in the [0, 1] range:
    A = A / pixelsPerChannel / 255;

    return {
      R, G, B, A,
    };
  }
}
