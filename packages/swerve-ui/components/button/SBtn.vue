<template>
  <div class="btn" :class="{ fill }">
    <nuxt-link :to="to" class="btn__link">
      <slot></slot>
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    /**
     * An acceptable v-router string
     * @TODO: handle with better typing
     */
    to: String,
    /**
     * Adds a fill class to button.
     */
    fill: Boolean,
  },
  data() {
    return {
    }
  }
})
</script>

<style lang="scss">
.btn {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5rem 1rem;
  height: 2.5rem;
  border-radius: 1.25rem;
  color: rgba(163, 249, 231, 1);
  transition: all 150ms ease-out;
  border: 1px solid rgba(163, 249, 231, 1);

  &.fill {
    background: rgba(163, 249, 231, 1);
    color: rgba(18, 20, 21, 1);
  }

  &:hover {
    border-color: rgba(143, 229, 211, 1);
    color: rgba(143, 229, 211, 1);

    &.fill {
      background: rgba(148, 234, 216, 1);
      color: rgba(18, 20, 21, 1);
    }
  }
}
</style>