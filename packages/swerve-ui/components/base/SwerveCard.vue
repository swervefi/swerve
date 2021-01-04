<template>
  <div class="card">
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({

})
</script>

<style lang="scss">
.card {
  background: #202426;
  border-radius: 12px;
  border: 1px solid rgba(163, 249, 231, 1);
  padding: 1em;
}
</style>
