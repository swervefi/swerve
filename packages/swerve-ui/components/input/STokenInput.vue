<template>
  <div class="token-input">
    <SInput v-model="value" :label="label" />
    <div class="token-wrapper">
      <span class="token-wrapper__max">MAX</span>
      <SToken :token="token" />
      <span class="token-label">{{ token | uppercase }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import SInput from '@/components/input/SInput.vue'
import SToken from '@/components/base/SToken.vue'
import isValidToken from '@/lib/validators/token'
import uppercase from '@/lib/filters/uppercase'

export default defineComponent({
  name: 'STokenInput',
  components: {
    SInput,
    SToken
  },
  filters: {
    uppercase
  },
  props: {
    label: {
      type: String,
      required: true
    },
    /**
     * Symbol of the token to display
     */
    token: {
      type: String,
      required: true,
      validator: isValidToken
    }
  },
  data () {
    return {
      value: ''
    }
  }
})
</script>

<style lang="scss">
.token-input {
  display: flex;
  position: relative;
  width: 240px;

  .token-wrapper {
    position: absolute;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    top: 1.8em;
    right: 1.5em;

    &__max {
      color: var(--primary-color);
      font-size: 0.875em;
    }

    .token {
      height: 24px;
      width: 24px;
    }
  }
}
</style>
