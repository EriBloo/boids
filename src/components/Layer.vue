<template>
  <v-layer>
    <BoidPoly
      :key="index"
      v-for="(boid, index) in boids.boids"
      :posX="boid.position[0]"
      :posY="boid.position[1]"
      :rotation="boid.velocity[1]"
    />
  </v-layer>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";

import BoidPoly from "./BoidPoly.vue";

import { Boids } from "../scripts/boids";
import { modulo } from "../scripts/utils";

@Component({
  components: { BoidPoly },
})
export default class Layer extends Vue {
  @Prop(Number) readonly width!: number;
  @Prop(Number) readonly height!: number;

  boids = new Boids(100, this.width, this.height);

  normalize(value: number, max: number): number {
    return modulo(value, max);
  }

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
