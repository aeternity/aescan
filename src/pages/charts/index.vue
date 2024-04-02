<template>
  <Head>
    <Title>Charts</Title>
  </Head>

  <page-header>
    Charts
    <template #tooltip>
      {{ stateChannelsHints.stateChannel }}
      <app-link
        variant="primary"
        to="https://aeternity.com/state-channels">
        Learn more
      </app-link>
    </template>
  </page-header>

  <div class="page">
    <nav>
      <app-panel>
        <app-link to="/charts">
          Transactions
        </app-link>
      </app-panel>
    </nav>
    <div class="container">
      <template v-if="!isLoading">
        <charts-transactions-chart-panel class="transactions-panel"/>
      </template>
      <loader-panel v-else/>
    </div>
  </div>
</template>

<script setup>
const { isLoading } = useLoading()
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (--desktop) {
    flex-direction: row;
  }
}

.container {
  flex-grow: 1;
}

nav {
  width: 200px;
}
</style>
