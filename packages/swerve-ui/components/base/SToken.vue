<template>
  <div class="token" :class="token" v-html="content" />
</template>

<script lang="ts">
import { Component } from 'vue'
import { ComponentMap } from '@/types'
import { defineComponent } from '@vue/composition-api'
import isValidToken from '@/lib/validators/token'
const UsdcIcon = require('~/assets/tokens/usdc.svg?raw')
const UsdtIcon = require('~/assets/tokens/usdt.svg?raw')
const TusdIcon = require('~/assets/tokens/tusd.svg?raw')
const DefaultIcon = require('~/assets/tokens/default-token.svg?raw')
const DaiIcon = require('~/assets/tokens/dai.svg?raw')

export default defineComponent({
  props: {
    /**
     * Symbol of the token to display
     */
    token: {
      type: String,
      required: false,
      default: 'default',
      validator: isValidToken
    }
  },
  data () {
    return {
      tokenIconMap: {
        default: DefaultIcon,
        dai: DaiIcon,
        usdc: UsdcIcon,
        usdt: UsdtIcon,
        tusd: TusdIcon
      } as ComponentMap
    }
  },
  computed: {
    content (): Component {
      if (this.token in this.tokenIconMap) {
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
