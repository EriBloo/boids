<template>
  <v-layer>
    <BoidPoly
      :key="index"
      v-for="(boid, index) in boids"
      :posX="boid.position[0]"
      :posY="boid.position[1]"
      :rotation="boid.rotation"
    />
  </v-layer>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import BoidPoly from "./BoidPoly.vue";

import Boid from "../scripts/boid";

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
}
</script>
