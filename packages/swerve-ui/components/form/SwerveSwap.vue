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
        <div class="value">$X.XX</div>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import SwerveInput from "@/components/base/SwerveInput.vue";

export default defineComponent({
  components: {
    SwerveInput,
  },
});
</script>

<style lang="scss">
.swerve-swap {
  color: slategray;
  background: white;
  height: 420px;
  width: 320px;
  border-radius: 12px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  input {
    margin-bottom: 12px;
    width: 240px;
  }

  .swap-info {
    display: flex;
    flex-flow: column nowrap;
    background: linen;
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
