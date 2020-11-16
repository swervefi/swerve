<template>
  <div class="cta">
    <nuxt-link :to="to" class="cta__link"
      ><slot></slot><i class="icon">&raquo;</i></nuxt-link
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    to: String
  },
  data() {
    return {
    }
  }
})
</script>

<style lang="scss">
.cta {
  &__link {
    transition: all 300ms ease-out;
    padding: 0.5em 1em;
    background: rgba(174, 252, 251, 1);
    color: rgba(18, 20, 21, 1);

    .icon {
      margin-left: 0.5em;
    }

    &:hover {
      background: rgba(134, 252, 231, 1);
      // color: #202426;
    }
  }
}
</style>