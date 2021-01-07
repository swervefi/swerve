<template>
  <label class="checkbox">
    <span class="checkbox__input">
      <input
        :id="name"
        :name="name"
        type="checkbox"
        :value="value"
        :disabled="disabled"
        :checked="value"
        @input="$emit('input', $event.target.value)"
      >
      <span class="checkbox__control">
        <svg
          class="checkmark"
          viewBox="0 0 10 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M9 1L3.5 7L1 4.27273" stroke="#121415" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </span>
    </span>
    <span :for="name">{{ label }}</span>
  </label>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'SCheckbox',
  inheritAttrs: false,
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: '',
      required: true
    },
    name: {
      type: String,
      default: '',
      required: true
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {

    }
  }
})
</script>

<style lang="scss">
.checkbox {
  // Change the font size to change the size of the checkbox
  font-size: 1rem;
  display: grid;
  grid-template-columns: min-content auto;
  grid-gap: 0.5em;

  &__control {
    display: inline-grid;
    width: 1em;
    height: 1em;
    background-color: var(--background-color);
    transition: background-color 100ms linear;
    border-radius: 0.125em;
    align-items: center;

    svg {
      transition: transform 100ms ease-in 25ms;
      transform: scale(0);
      transform-origin: center;
    }
  }

  &__input {
    display: grid;
    grid-template-areas: "checkbox";
    border-radius: 0.25em;

    > * {
      grid-area: checkbox;
    }

    input {
      opacity: 0;
      width: 1em;
      height: 1em;

      &:focus + .checkbox__control {
        box-shadow: 0px 0px 4px 1px rgba(134, 252, 231, 1);
      }

      &:checked + .checkbox__control {
        background-color: var(--primary-color);

        & .checkmark {
          transform: scale(0.66);
        }
      }

      &:disabled + .checkbox__control {
        background-color: var(--disabled-color);
      }
    }
  }
}
</style>
