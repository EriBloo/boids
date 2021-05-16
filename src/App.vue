<template>
  <div>
    <Stage />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Stage from "./components/Stage.vue";

@Component({
  components: { Stage },
})
export default class App extends Vue {}
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
