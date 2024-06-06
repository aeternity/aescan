<template>
  <Head>
    <Title>AE Coin</Title>
  </Head>

  <page-header>
    AE Coin
    <template #tooltip>
      {{ aeCoinHints.aeCoin }}
    </template>
  </page-header>

  <template v-if="!isLoading">
    <ae-coin-panel class="ae-coin__panel"/>
    <app-tabs>
      <app-tab title="Transactions">
        <ae-coin-transactions-panel/>
      </app-tab>
      <app-tab title="Markets">
        <ae-coin-markets-panel/>
      </app-tab>
      <!--      add tab functionality-->
    </app-tabs>
  </template>
  <loader-panel v-else/>
</template>

<script setup>
import { aeCoinHints } from '@/utils/hints/aeCoinHints'

const { isLoading } = useLoading()
</script>

<style scoped>
.ae-coin__panel {
  margin-bottom: var(--space-4);

  @media (--desktop) {
    margin-bottom: var(--space-6);
  }
}
</style>
