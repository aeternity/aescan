<template>
  <div class="master-detail">
    <div class="master-detail__parallax">
      <div class="master-detail__container">
        <slot name="master"/>
        <div class="master-detail__detail">
          <slot name="detail"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>

.master-detail {
  background-image: url("@/assets/background.svg");
  background-color: var(--color-midnight-35);
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  &__parallax {
    max-width: var(--container-width);
    margin: 0 auto;
  }

  &__container {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);

    @media (--desktop) {
      flex-direction: row;
    }
  }

  &__detail {
    flex-grow: 1;
  }
}
</style>
