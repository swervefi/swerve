<template>
  <div class="home">
    <SwerveSwap />
    <SwerveCard class="card--learn">
      <p>Want to know more about Swerve?</p>
      <SBtn to="/learn">Learn</SBtn>
    </SwerveCard>
    <SBtn to="/styleguide">Styleguide</SBtn>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import SwerveCard from '@/components/base/SwerveCard.vue'
import SBtn from '@/components/button/SBtn.vue'
import SwerveSwap from '@/components/form/SwerveSwap.vue'

export default defineComponent({
  components: {
    SwerveCard,
    SBtn,
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
