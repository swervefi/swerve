<template>
  <input></input>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'SwerveInput'
})
</script>

<style lang="scss">
input {
  background: #2f3437;
  padding: 4px;
  border: none;
  border-radius: 4px;
  color: rgba(134, 252, 231, 1);

  &:disabled {
    background: rgba($color: #2f3437, $alpha: 0.6);
    color: white;
    border-style: none;
  }

  &:focus {
    border: 1px solid rgba(174, 252, 251, 1);
    outline: none;
  }
}
</style>
