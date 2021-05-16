<template>
  <v-stage :config="stageConfig">
    <Layer :width="windowWidth" :height="windowHeight" />
  </v-stage>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

import Layer from "./Layer.vue";

@Component({
  components: { Layer },
})
export default class Stage extends Vue {
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;

  stageConfig = {
    width: this.windowWidth,
    height: this.windowHeight,
  };

  @Watch("windowWidth")
  onWidthChange(width: number): void {
    this.stageConfig.width = width;
  }

  @Watch("windowHeight")
  onHeightChange(height: number): void {
    this.stageConfig.height = height;
  }

  updateWindowWidth(): void {
    this.windowWidth = window.innerWidth;
  }

  updateWindowHeight(): void {
    this.windowHeight = window.innerHeight;
  }

  mounted(): void {
    window.addEventListener("resize", this.updateWindowWidth);
    window.addEventListener("resize", this.updateWindowHeight);
  }
}
</script>
