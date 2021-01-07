<template>
  <div class="field" :class="{ required }">
    <input
      :id="name"
      v-model="value"
      :type="type"
      :aria-required="required"
      :disabled="disabled"
      :readonly="readonly"
    >
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
    readonly: Boolean,
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
  background: var(--secondary-color);
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
    background: var(--disabled-color);
    color: white;
    border-style: none;
  }

  &:focus {
    color: var(--text-color);
    border: 1px solid var(--primary-color);
    outline: none;

    &.cyberpunk {
      box-shadow: 0px 0px 12px 0px rgba(134, 252, 231, 1);
    }
  }

  &:read-only {
    // TODO: Read only inputs
    cursor: not-allowed;
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
