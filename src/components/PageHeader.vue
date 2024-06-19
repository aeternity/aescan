<template>
  <header class="page-header">
    <div class="page-header__container">
      <app-title>
        <slot/>
        <hint-tooltip
          v-if="$slots.tooltip"
          class="page-header__tooltip"
          variant="dark">
          <slot name="tooltip"/>
        </hint-tooltip>
      </app-title>
      <slot name="end"/>
    </div>
    <the-search-bar class="page-header__search-bar"/>
  </header>
</template>

<script setup>
import TheSearchBar from '@/components/TheSearchBar'
import AppTitle from '@/components/AppTitle'
import HintTooltip from '@/components/HintTooltip'
</script>

<style scoped>
.page-header {
  padding: 8px 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  margin: 0 var(--space-1) var(--space-6);

  @media (--desktop) {
    margin: 0 0 var(--space-6);
  }

  &__container {
    display: flex;
  }

  &__search-bar {
    width: 100%;

    @media (--desktop) {
      width: 50%;
      margin-bottom: var(--space-0);
    }
  }

  &__tooltip {
    margin-left: var(--space-1);
  }
}
</style>
