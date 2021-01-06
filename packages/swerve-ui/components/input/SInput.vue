<template>
  <div class="field" :class="{ required }">
    <input :id="name" v-model="value" :type="type" :aria-required="required">
    <label :for="name">
      {{ label }}
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'SInput',
  inheritAttrs: false,
  props: {
    /**
     * Disables the input
     */
    disabled: Boolean,
    /**
     * Input label to display
     */
    label: {
      type: String,
      required: true
    },
    /**
     * Forces user to supply input
     */
    required: Boolean,
    type: {
      default: 'number',
      validator (s: string) {
        return ['text', 'number'].includes(s)
      }
    }
  },
  data () {
    return {
      value: ''
    }
  },
  computed: {
    name (): String {
      return this.label.replace(' ', '-')
    }
  }
})
</script>

<style lang="scss">
.field {
  display: flex;
  flex-flow: column-reverse;
  align-items: flex-start;
  flex: 1 1 auto;
}

input {
  background: rgba(18, 20, 21, 1);
  padding: 0.25em;
  border: none;
  border-radius: 0.25em;
  color: rgba(240, 240, 240, 1); // Initial state
  height: 3.5em;
  width: 100%;

  &.cyberpunk {
    color: rgba(134, 252, 231, 1);
  }

  &.required {
  }

  &:disabled {
    background: rgba($color: #2f3437, $alpha: 0.6);
    color: white;
    border-style: none;
  }

  &:focus {
    color: rgba(255, 255, 255, 1);
    border: 1px solid rgba(174, 252, 251, 1);
    outline: none;

    &.cyberpunk {
      box-shadow: 0px 0px 12px 0px rgba(134, 252, 231, 1);
    }
  }
}

label {
  font-size: 0.875em;
  line-height: 1.125em;
  margin-bottom: 0.25em;
}

input + label {
}
</style>
