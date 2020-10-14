<template>
  <div class="home">
    <SwerveSwap />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import SwerveSwap from "@/components/form/SwerveSwap.vue";

export default defineComponent({
  components: {
    SwerveSwap,
  },
});
</script>

<style lang="scss">
.home {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}
</style>