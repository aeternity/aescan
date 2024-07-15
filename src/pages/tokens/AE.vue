<template>
  <Head>
    <Title>AE Coin</Title>
  </Head>

  <page-header>
    AE Coin
    <template #tooltip>
      {{ aeCoinHints.aeCoin }}
    </template>

    <template #end>
      <app-dropdown class="ae-coin__dropdown">
        <app-button class="ae-coin__button">
          Trade
        </app-button>
        <template #menu>
          <markets-list/>
        </template>
      </app-dropdown>
    </template>
  </page-header>

  <template v-if="!isLoading">
    <ae-coin-panel class="ae-coin__panel"/>
    <app-tabs>
      <app-tab title="Transactions">
        <ae-coin-transactions-panel/>
      </app-tab>
    </app-tabs>
  </template>
  <loader-panel v-else/>
</template>

<script setup>
import { aeCoinHints } from '@/utils/hints/aeCoinHints'

const { isLoading } = useLoading()
</script>

<style scoped>
.ae-coin {
  &__panel {
    margin-bottom: var(--space-4);

    @media (--desktop) {
      margin-bottom: var(--space-6);
    }
  }

  &__button {
    height: 32px;
    margin-left: var(--space-1);
  }

  &__dropdown {
    display: flex;
    align-items: center;
    margin-bottom: var(--space-5);

    @media (--desktop) {
      margin-bottom: 0;
    }
  }
}
</style>
