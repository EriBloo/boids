<template>
  <v-layer ref="layer">
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
import Konva from "konva";

import BoidPoly from "./BoidPoly.vue";

import { BoidsController } from "../scripts/boidsController";

@Component({
  components: { BoidPoly },
})
export default class Layer extends Vue {
  @Prop(Number) readonly width!: number;
  @Prop(Number) readonly height!: number;

  boids = new BoidsController(50, this.width, this.height);

  mounted(): void {
    // setInterval(
    //   (function (self) {
    //     return function () {
    //       self.boids.update();
    //     };
    //   })(this),
    //   1000 / 60
    // );

    const anim = new Konva.Animation(
      (function (self) {
        return function () {
          self.boids.update();
        };
      })(this),
      this.$refs.layer
    );

    anim.start();
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
