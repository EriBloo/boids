<template>
  <v-layer ref="layer">
    <Boid
      :key="`${index}-boid`"
      v-for="(boid, index) in boids.boids"
      :posX="boid.position.x"
      :posY="boid.position.y"
      :rotation="boid.velocity.angle"
    />
    <Obstacle
      :key="`${index}-obstacle`"
      v-for="(obstacle, index) in boids.obstacles"
      :points="obstacle.points"
    />
  </v-layer>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";

import Boid from "./Boid.vue";
import Obstacle from "./Obstacle.vue";

import { BoidsController } from "../scripts/boidsController";
import { settings } from "../scripts/settings";

const { numBoids } = settings;

@Component({
  components: { Boid, Obstacle },
})
export default class Layer extends Vue {
  @Prop(Number) readonly width!: number;
  @Prop(Number) readonly height!: number;

  boids = new BoidsController(numBoids, this.width, this.height);

  timer = 0;

  update(): void {
    this.boids.update();

    cancelAnimationFrame(this.timer);
    this.timer = requestAnimationFrame(this.update);
  }

  mounted(): void {
    requestAnimationFrame(this.update);
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
