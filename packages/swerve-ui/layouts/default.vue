<template>
  <div>
    <SwerveMenu />
    <nuxt />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import SwerveMenu from "@/components/menu/SwerveMenu.vue";

export default defineComponent({
  components: {
    SwerveMenu,
  },
});
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap");

* {
  box-sizing: border-box;
}

html {
  color: white;
  background: #2f3437;
  font-family: "Roboto Mono", monospace;
  font-size: 10pt;
  text-align: center;
}

body {
  padding: 0;
  margin: 0;
}
</style>
