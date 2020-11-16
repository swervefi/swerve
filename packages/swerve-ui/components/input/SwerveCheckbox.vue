<template>
  <div class="checkbox">
    <input :id="name" type="checkbox" :value="value" />
    <label :for="name">{{ label }}</label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    label: String
  },
  data() {
    return {
    }
  }
})
</script>

<style lang="scss">
input[type="checkbox"] {
}
</style>