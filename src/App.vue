<template>
  <div id="app">
    <div class="canvas-container">
      <canvas id="matrixCanvas" width="75" height="750"></canvas>
    </div>
    <label>
      <input type="checkbox" v-model="showGrid">
      Show Grid
    </label>
    <label>
      <input type="checkbox" v-model="showPixels">
      Show Pixels
    </label>
    <label>
      <input type="checkbox" v-model="sendToLamp">
      Send to Lamp
    </label>
    <div id="example-1">
      <button v-on:click="counterAdd()">Change mode</button>
      <p>You have selected mode {{ counter }}.</p>
    </div>
  </div>
</template>

<script>
import AnimationController from './services/animationController';
import Bounce from './services/animations/bounce';
import Blink from './services/animations/blink';

export default {
  name: 'App',
  data() {
    return {
      controller: null,
      socket: null,
      showPixels: false,
      showGrid: false,
      ack: true,
      sendToLamp: false,
      counter: 1,
      optionCount: 2,
    };
  },
  mounted() {
    const canvasEl = document.getElementById('matrixCanvas');

    this.controller = new AnimationController(canvasEl);

    setInterval(this.drawAnimationFrame, 1000 / AnimationController.FRAMERATE);

    this.controller.setAnimation(new Bounce(this.controller));

    this.socket = new WebSocket('ws://10.0.0.83');
    this.socket.onmessage = () => {
      this.ack = true;
    };
  },
  methods: {
    drawAnimationFrame() {
      // eslint-disable-next-line no-unused-vars
      const stripData = this.controller.draw(this.showGrid, this.showPixels);
      if (this.socket !== null && this.socket.readyState === WebSocket.OPEN) {
        const data = JSON.stringify(stripData.flat());
        if (this.ack && this.sendToLamp) {
          this.socket.send(data);
          this.ack = false;
        }
      }
    },
    counterAdd() {
      if (this.counter < this.optionCount) {
        this.counter += 1;
      } else this.counter = 1;
      switch (this.counter) {
        case 1:
          this.controller.setAnimation(new Bounce(this.controller));
          break;
        case 2:
          this.controller.setAnimation(new Blink(this.controller));
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}

#app {
  height: 100%;
}
.canvas-container {
  height: 100%;
}
</style>
