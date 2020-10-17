<template>
  <div>
    <SwerveMenu />
    <nuxt />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import SwerveMenu from '@/components/menu/SwerveMenu.vue'

export default defineComponent({
  components: {
    SwerveMenu
  }
})
</script>

<style lang="scss">
/**
* Mulish Font Family
* @see https://fonts.google.com/specimen/Mulish
*/
@import url("https://fonts.googleapis.com/css2?family=Mulish:wght@300;500;700&display=swap");

:root {
  font-family: "Mulish", sans-serif;
}

* {
  box-sizing: border-box;
}

html {
  color: white;
  background: #2f3437;
  font-size: 10pt;
  text-align: center;
}

body {
  padding: 0;
  margin: 0;
}

a {
  color: inherit;
  font-weight: bolder;
  text-decoration: none;
}

ul {
  list-style: none;
}
</style>
