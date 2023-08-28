<template>
  <Head>
    <Title>{{ APP_TITLE_SHORT }} | Smart Contract</Title>
  </Head>

  <page-header>
    Smart Contract

    <template #tooltip>
      {{ contractsHints.contract }}
      <app-link
        variant="primary"
        to="https://docs.aeternity.com/protocol/contracts/">
        Learn more
      </app-link>
    </template>
  </page-header>

  <template v-if="!isLoading">
    <contract-details-panel
      class="contract-details__panel"
      :contract-details="contractDetails"/>

    <app-tabs v-if="contractDetails">
      <app-tab title="Call Transactions">
        <contract-call-transactions-panel/>
      </app-tab>
      <app-tab title="Events">
        <contract-events-panel/>
      </app-tab>
    </app-tabs>
  </template>
  <loader-panel v-else/>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import ContractDetailsPanel from '@/components/ContractDetailsPanel'
import PageHeader from '@/components/PageHeader'
import { useContractDetailsStore } from '@/stores/contractDetails'
import AppTabs from '@/components/AppTabs'
import AppTab from '@/components/AppTab'
import ContractEventsPanel from '@/components/ContractEventsPanel'
import { isDesktop } from '@/utils/screen'
import { contractsHints } from '@/utils/hints/contractsHints'
import ContractCallTransactionsPanel from '@/components/ContractCallTransactionsPanel'

const contractDetailsStore = useContractDetailsStore()
const { contractDetails } = storeToRefs(contractDetailsStore)
const { fetchContractDetails, fetchContractEvents } = contractDetailsStore
const route = useRoute()

const { isLoading } = useLoading()

const { error } = await useAsyncData(() => fetchContractDetails(route.params.id))

if (error.value) {
  throw showError({
    data: {
      entityName: 'Smart Contract',
      entityId: route.params.id,
    },
    statusMessage: 'EntityDetailsNotFound',
  })
}

if (process.client && !error.value) {
  const limit = isDesktop() ? 10 : 3
  await useAsyncData(() => fetchContractEvents({
    queryParameters: `/v2/contracts/logs?contract_id=${route.params.id}&limit=${limit}`,
  }))
}
</script>

<style scoped>
.contract-details__panel {
  margin-bottom: var(--space-4);
  @media (--desktop) {
    margin-bottom: var(--space-6);
  }
}
</style>
