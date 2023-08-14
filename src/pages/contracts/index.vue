<template>
  <Head>
    <Title>{{ APP_TITLE_SHORT }} | Smart Contracts</Title>
  </Head>

  <page-header>
    Smart Contracts

    <template #tooltip>
      {{ contractsHints.contract }}
      <app-link
        variant="primary"
        to="https://docs.aeternity.com/protocol/contracts/">
        Learn more
      </app-link>
    </template>
  </page-header>

  <contracts-panel
    v-if="!isLoading"
    class="contracts__contracts-panel"/>
  <loader-panel v-else/>
</template>

<script setup>
import ContractsPanel from '@/components/ContractsPanel'
import PageHeader from '@/components/PageHeader'
import { contractsHints } from '@/utils/hints/contractsHints'

const { isLoading } = useLoading()
</script>

<style scoped>
.contracts__contracts-panel {
  margin-bottom: var(--space-6);
}
</style>
