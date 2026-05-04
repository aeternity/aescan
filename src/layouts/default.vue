<template>
  <div class="default-layout">
    <div class="default-layout__parallax">
      <slot/>
    </div>
  </div>
</template>

<style scoped>
.default-layout {
  flex: 1 0 auto;
  background-image: var(--bg-image);
  background-color: var(--color-snow);
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  &__parallax {
    padding: var(--space-6) var(--space-1);
    max-width: var(--container-width);
    margin: 0 auto;

    @media (--desktop) {
      padding: 120px 0 var(--space-6);
    }
  }
}
</style>
