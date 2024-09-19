<template>
  <nav class="charts-navigation">
    <app-panel class="charts-navigation__panel">
      <app-link
        v-for="option in menuOptions"
        :key="option.name"
        class="charts-navigation__link"
        :to="`/charts/${option.path}`">
        {{ option.name }}
      </app-link>
    </app-panel>
  </nav>
</template>
<script setup>

const menuOptions = ref([{
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
  name: 'Names',
  path: 'names',
},
{
  name: 'Difficulty',
  path: 'difficulty',
}])
</script>
<style scoped>
.charts-navigation {
  width: 100%;

  @media (--desktop) {
    width: 200px;
  }

  &__panel {
    display: flex;
    flex-direction: row;

    @media (--desktop) {
      flex-direction: column;
    }
  }

  &__link {
    display: flex;

    &:not(:last-child) {
      margin-right: var(--space-3);

      @media (--desktop) {
        margin-bottom: var(--space-1);
      }
    }
  }
}
</style>
