<template>
  <nav class="charts-navigation">
    <app-panel class="charts-navigation__panel">
      <app-link
        v-for="option in menuOptions"
        :key="option.name"
        :class="['charts-navigation__link', {'charts-navigation__link--active': option.path === activeSection}]"
        :to="`/charts/${option.path}`">
        {{ option.name }}
      </app-link>
    </app-panel>
  </nav>
</template>

<script setup>
const route = useRoute()

const menuOptions = [
  {
    name: 'Price',
    path: 'price',
  },
  {
    name: 'Transactions',
    path: 'transactions',
  },
  {
    name: 'Keyblocks',
    path: 'keyblocks',
  },
  {
    name: 'Smart Contracts',
    path: 'contracts',
  },
  {
    name: 'Accounts',
    path: 'accounts',
  },
  {
    name: 'Names',
    path: 'names',
  },
  {
    name: 'Difficulty',
    path: 'difficulty',
  },
  {
    name: 'Hashrate',
    path: 'hashrate',
  },
]

const activeSection = computed(() => route.path.split('/').pop())
</script>

<style scoped>
.charts-navigation {
  width: 100%;

  @media (--desktop) {
    width: 200px;
    position: sticky;
    top: 88px;
    align-self: flex-start;
  }

  &__panel {
    display: flex;
    flex-direction: row;
    overflow: auto;

    @media (--desktop) {
      flex-direction: column;
      max-height: calc(100vh - 104px);
    }
  }

  &__link {
    white-space: nowrap;

    &:not(:last-child) {
      margin-right: var(--space-3);

      @media (--desktop) {
        margin-bottom: var(--space-1);
      }
    }

    &--active {
      color: var(--color-fire);
    }
  }
}
</style>
