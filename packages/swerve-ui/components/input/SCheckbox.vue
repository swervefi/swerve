<template>
  <div class="checkbox">
    <input :id="name" type="checkbox" :value="value">
    <label :for="name">{{ label }}</label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'SCheckbox',
  props: {
    label: {
      type: String,
      default: '',
      required: true
    }
  },
  data () {
    return {

    }
  }
})
</script>

<style lang="scss">
input[type="checkbox"] {
}
</style>
