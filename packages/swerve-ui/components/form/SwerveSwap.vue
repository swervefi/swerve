<template>
  <SwerveCard>
    <form class="swerve-swap">
      <p>Swap using Swerve pools</p>
      <SInput label="from" />
      <SInput label="to" />
      <div class="swap-info">
        <div class="swap-info--item">
          <div class="label">Price:</div>
          <div class="value">{{ price | currency }} AAA/BBB</div>
        </div>
        <div class="swap-info--item">
          <div class="label">Est. TX Cost:</div>
          <div class="value">
            {{ price | currency }}
          </div>
        </div>
      </div>
    </form>
  </SwerveCard>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import SwerveCard from '@/components/base/SwerveCard.vue'
import SInput from '@/components/input/SInput.vue'
import currency from "@/filters/currency.ts"

export default defineComponent({
  components: {
    SwerveCard,
    SInput
  },
  data() {
    return {
      tokens: [],
      price: 400
    }
  },
  filters: {
    currency
  }
})
</script>

<style lang="scss">
.swerve-swap {
  color: white;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  .swap-info {
    display: flex;
    flex-flow: column nowrap;
    background: #202426;
    border-radius: 8px;

    &--item {
      padding: 8px;
      width: 240px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
    }
  }
}
</style>
