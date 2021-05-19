<template>
  <v-layer>
    <BoidPoly
      :key="index"
      v-for="(boid, index) in boids.boids"
      :posX="boid.position.x"
      :posY="boid.position.y"
      :rotation="boid.velocity.angle"
    />
  </v-layer>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";

import BoidPoly from "./BoidPoly.vue";

import { BoidsController } from "../scripts/boidsController";

@Component({
  components: { BoidPoly },
})
export default class Layer extends Vue {
  @Prop(Number) readonly width!: number;
  @Prop(Number) readonly height!: number;

  boids = new BoidsController(100, this.width, this.height);

  mounted(): void {
    setInterval(
      (function (self) {
        return function () {
          self.boids.cycle();
        };
      })(this),
      1000 / 60
    );
  }

  @Watch("width")
  onWidthChange(w: number): void {
    this.boids.domainWidth = w;
  }

  @Watch("height")
  onHeightChange(h: number): void {
    this.boids.domainWidth = h;
  }
}
</script>
