<template>
  <nav>
    <ul>
      <li><nuxt-link to="/">Swap</nuxt-link></li>
      <li><nuxt-link to="/deposit">Deposit</nuxt-link></li>
      <li><nuxt-link to="/dao">DAO</nuxt-link></li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  components: {}
})
</script>

<style lang="scss">
nav {
  ul {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;

    li {
      padding: 4px;
      width: 80px;

      a {
        &.nuxt-link-active {
          color: grey;
        }
      }
    }
  }
}
</style>
