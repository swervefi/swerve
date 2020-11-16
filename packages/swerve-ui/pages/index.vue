<template>
  <div class="home">
    <SwerveSwap />
    <SwerveCard class="card--learn">
      <p>Want to know more about Swerve?</p>
      <SwerveCta to="/learn">Learn</SwerveCta>
    </SwerveCard>
    <SwerveCta to="/styleguide">Styleguide</SwerveCta>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import SwerveCard from '@/components/base/SwerveCard.vue'
import SwerveCta from '@/components/button/SwerveCta.vue'
import SwerveSwap from '@/components/form/SwerveSwap.vue'

export default defineComponent({
  components: {
    SwerveCard,
    SwerveCta,
    SwerveSwap
  }
})
</script>

<style lang="scss">
.home {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  > div {
    margin: 1em;
  }

  .card--learn {
    padding: 1em;
  }
}
</style>
