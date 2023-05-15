<template>
  <div class="data-failed">
    Data failed to fetch. Please try again later. Maybe the
    <app-link to="https://forum.aeternity.com/">
      community
    </app-link>
    can help you.
  </div>
</template>

<style scoped>
.data-failed {
  font-family: var(--font-monospaced);
  text-align: center;
  padding: var(--space-2);
  color: var(--color-midnight);
  background: var(--color-snow);
}

</style>
