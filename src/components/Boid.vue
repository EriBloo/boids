<template>
  <v-regular-polygon :config="polygonConfig" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { ShapeConfig } from "konva/types/Shape";

@Component
export default class Boid extends Vue {
  @Prop(Number) readonly posX!: number;
  @Prop(Number) readonly posY!: number;
  @Prop(Number) readonly rotation!: number;

  colors = [
    "#1E5162",
    "#296E85",
    "#338BA8",
    "#43A6C6",
    "#67B7D1",
    "#8AC7DB",
    "#ADD8E6",
  ];

  getRandomColor(): string {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }

  color = "white";

  get polygonConfig(): ShapeConfig {
    return {
      x: Math.floor(this.posX),
      y: Math.floor(this.posY),
      rotation: this.rotation + 90,
      sides: 3,
      width: 20,
      height: 20,
      scaleX: 0.7,
      fill: this.color,
      stroke: "gray",
      strokeWidth: 1,
    };
  }

  mounted(): void {
    this.color = this.getRandomColor();
  }
}
</script>
