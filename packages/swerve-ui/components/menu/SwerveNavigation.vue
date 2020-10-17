<template>
  <nav class="navigation">
    <div class="logo">
      <img src="/logo.svg" width="160" />
    </div>
    <ul>
      <li>
        <nuxt-link to="/">Home</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/">About</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/">Learn</nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss">
.navigation {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  padding: 4px 4px 0;
  background: #212426;
}
</style>