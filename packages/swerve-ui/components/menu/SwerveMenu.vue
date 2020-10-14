<template>
  <div>
    <SwerveLogo />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import SwerveLogo from "@/components/common/SwerveLogo.vue";

export default defineComponent({
  components: {
    SwerveLogo,
  },
});
</script>