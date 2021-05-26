<template>
  <v-line :config="lineConfig" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { ShapeConfig } from "konva/types/Shape";

@Component
export default class Obstacle extends Vue {
  @Prop(Array) readonly points!: number[];

  get lineConfig(): ShapeConfig {
    return {
      points: this.points,
      fill: "#601A35",
      stroke: "#333333",
      strokeWidth: 2,
      closed: true,
    };
  }
}
</script>
