<template>
  <h1 class="title">
    <slot/>
  </h1>
</template>

<style scoped>
.title {
  color: var(--color-midnight);
  margin-bottom: var(--space-5);
  @media (--desktop) {
    margin-bottom: 0;
  }
}
</style>
