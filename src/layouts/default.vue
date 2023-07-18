<template>
  <div class="default-layout">
    <div class="default-layout__parallax">
      <slot/>
    </div>
  </div>
</template>

<style scoped>
.default-layout {
  background-image: url("@/assets/background.svg");
  background-color: #d2d2d2;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-blend-mode: multiply;

  &__parallax {
    padding: 120px var(--space-1) var(--space-6);
    max-width: var(--container-width);
    margin: 0 auto;
    @media (--desktop) {
      padding: 120px 0;
    }
  }
}
</style>
