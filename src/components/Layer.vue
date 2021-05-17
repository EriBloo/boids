<template>
  <v-layer>
    <BoidPoly
      :key="index"
      v-for="(boid, index) in boids"
      :posX="normalize(boid.position[0], width)"
      :posY="normalize(boid.position[1], height)"
      :rotation="boid.rotation"
    />
  </v-layer>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import BoidPoly from "./BoidPoly.vue";

import { Boid } from "../scripts/boid";
import { modulo } from "../scripts/utils";

@Component({
  components: { BoidPoly },
})
export default class Layer extends Vue {
  @Prop(Number) readonly width!: number;
  @Prop(Number) readonly height!: number;

  boids = new Array(100).fill({}).map(() => {
    return new Boid(
      Math.random() * this.width,
      Math.random() * this.height,
      Math.random() * 360
    );
  });

  normalize(value: number, max: number): number {
    return modulo(value, max);
  }

  mounted(): void {
    setInterval(
      (function (self) {
        return function () {
          self.boids.map((boid: Boid) => {
            boid.move();
          });
        };
      })(this),
      1000 / 60
    );
  }
}
</script>
