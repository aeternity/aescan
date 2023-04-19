<template>
  <header class="page-header">
    <app-subtitle class="page-header__subtitle">
      <slot/>
    </app-subtitle>
    <the-search-bar class="page-header__search-bar"/>
  </header>
</template>

<script>
import TheSearchBar from '@/components/TheSearchBar'
import AppSubtitle from '@/components/AppSubtitle'

export default {
  name: 'PageHeader',
  components: {
    AppSubtitle,
    TheSearchBar,
  },
}
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

  &__subtitle {
    margin-bottom: var(--space-4);
    @media (--desktop) {
      margin-bottom: 0;
    }
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
