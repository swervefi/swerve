<template>
  <div>
    <SwerveNavigation />
    <SwerveMenu />
    <nuxt />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import SwerveMenu from '@/components/menu/SwerveMenu.vue'
import SwerveNavigation from '@/components/menu/SwerveNavigation.vue'

export default defineComponent({
  components: {
    SwerveMenu,
    SwerveNavigation
  }
})
</script>

<style lang="scss">
/**
* Resets
*/
@supports(-webkit-appearance: none) or (-moz-appearance: none) {
  input[type='checkbox'],
  input[type='radio'] {
    -webkit-appearance: none;
    -moz-appearance: none;
  }
}

/**
* Mulish Font Family
* @see https://fonts.google.com/specimen/Mulish
*/
@import url("https://fonts.googleapis.com/css2?family=Mulish:wght@300;500;700&display=swap");

*,
*:before,
*:after {
  box-sizing: border-box;
}

html {
  color: white;
  background: rgba(76, 80, 84, 1);
  font-size: 16px;
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

p {
  font-weight: 300;
}
</style>
