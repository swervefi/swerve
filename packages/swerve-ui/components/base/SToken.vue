<template>
  <div class="token" :class="token" v-html="content"></div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import DaiIcon from '~/assets/tokens/dai.svg?raw'
import UsdcIcon from '~/assets/tokens/usdc.svg?raw'
import UsdtIcon from '~/assets/tokens/usdt.svg?raw'
import TusdIcon from '~/assets/tokens/tusd.svg?raw'
import DefaultIcon from '~/assets/tokens/default-token.svg?raw'

export default defineComponent({
  props: {
    /**
     * Symbol of the token to display
     */
    token: {
      type: String,
      required: false,
      default: 'default',
      validator: function (value: string) {
        return ['dai', 'usdc', 'usdt', 'tusd'].indexOf(value) !== -1
      }
    }
  },
  data() {
    return {
      tokenIconMap: {
        default: DefaultIcon,
        dai: DaiIcon,
        usdc: UsdcIcon,
        usdt: UsdtIcon,
        tusd: TusdIcon
      }
    }
  },
  computed: {
    content() {
      if (this.token in this.tokenIconMap)
      {
        return this.tokenIconMap[this.token]
      }
      return DefaultIcon
    }
  }
})
</script>

<style lang="scss">
.token {
  &.default {
    path {
      fill: rgb(121, 121, 121);
    }
  }
}
</style>