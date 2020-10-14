<template>
  <input />
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
export default defineComponent({});
</script>

<style lang="scss">
input {
  background: linen;
  padding: 1px 0 1px 0;
  border: none;
  border-radius: 4px;

  &:disabled {
    background: #2f3437;
    color: white;
    border-style: none;
  }
}
</style>