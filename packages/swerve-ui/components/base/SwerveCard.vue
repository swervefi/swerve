<template>
  <div class="card">
    <slot></slot>
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
  height: 420px;
  width: 320px;
  border-radius: 12px;
  // box-shadow: 0px 0px 12px 0px rgba(134, 252, 231, 1);
  border: 1px solid rgba(174, 252, 251, 1);
}
</style>