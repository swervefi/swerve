<template>
  <form class="swerve-swap">
    <p>Swap using Swerve pools</p>
    <SwerveInput name="swap-from" />
    <SwerveInput name="swap-to" />
    <div class="swap-info">
      <div class="swap-info--item">
        <div class="label">Price:</div>
        <div class="value">X.XXXXX AAA/BBB</div>
      </div>
      <div class="swap-info--item">
        <div class="label">Est. TX Cost:</div>
        <div class="value">{{ price | currency }}</div>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import SwerveInput from '@/components/base/SwerveInput.vue'

export default defineComponent({
  components: {
    SwerveInput
  },
  data() {
    return {
      tokens: [],
      price: 400
    }
  }
})
</script>

<style lang="scss">
.swerve-swap {
  color: white;
  background: #202426;
  height: 420px;
  width: 320px;
  border-radius: 12px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  // box-shadow: 0px 0px 12px 0px rgba(134, 252, 231, 1);
  border: 1px solid rgba(174, 252, 251, 1);

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
