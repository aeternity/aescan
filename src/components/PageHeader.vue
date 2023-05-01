<template>
  <header class="page-header">
    <app-title>
      <slot/>
    </app-title>
    <the-search-bar class="page-header__search-bar"/>
  </header>
</template>

<script setup>
import TheSearchBar from '@/components/TheSearchBar'
import AppTitle from '@/components/AppTitle'
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  margin: 0 var(--space-1) var(--space-7);

  @media (--desktop) {
    margin: 0 0 var(--space-6);
  }

  &__search-bar {
    width: 100%;
    @media (--desktop) {
      width: 50%;
      margin-bottom: var(--space-0);
    }
  }
}
</style>
