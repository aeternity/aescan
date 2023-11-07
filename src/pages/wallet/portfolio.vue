<template>
  <Head>
    <Title>Wallet Portfolio</Title>
  </Head>

  <page-header>
    Wallet Portfolio
    <template #tooltip>
      {{ walletHints.wallet }}
    </template>
  </page-header>
  <wallet-portfolio-stats class="portfolio_stats"/>
  <wallet-portfolio-panel/>
</template>

<script setup>
import { walletHints } from '@/utils/hints/walletHints'

</script>

<style scoped>
.portfolio_stats {
  margin-bottom: var(--space-4)
}
</style>
