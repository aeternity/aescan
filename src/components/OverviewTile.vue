<template>
  <div class="overview-tile">
    <div class="overview-tile__label">
      {{ label }}
    </div>
    <div class="overview-tile__value">
      <slot/>
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
})
</script>

<style scoped>
.overview-tile {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  padding: 15px 18px;
  background: var(--bg-elev);
  border: 1px solid var(--border);
  border-radius: 14px;

  &__label {
    margin-bottom: 7px;
    font-size: 11.5px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--text-faint);
  }

  &__value {
    display: flex;
    align-items: baseline;
    gap: 9px;
    font-family: var(--font-monospaced);
    font-size: 24px;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: var(--text);
  }
}
</style>
