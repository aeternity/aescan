<template>
  <Head>
    <Title>{{ APP_TITLE_SHORT }} | Smart Contract</Title>
  </Head>

  <page-header>
    Smart Contract
  </page-header>

  <template v-if="contractDetails">
    <contract-details-panel
      class="contract-details__panel"
      :contract-details="contractDetails"/>

    <app-tabs>
      <app-tab title="Call transactions">
        <contract-call-transactions-panel/>
      </app-tab>
      <app-tab title="Events">
        <contract-events-panel/>
      </app-tab>
    </app-tabs>
  </template>
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
import ContractCallTransactionsPanel from '@/components/ContractCallTransactionsPanel'

const contractDetailsStore = useContractDetailsStore()
const { contractDetails } = storeToRefs(contractDetailsStore)
const { fetchContractDetails, fetchContractEvents } = contractDetailsStore
const route = useRoute()

await useAsyncData(() => fetchContractDetails(route.params.id))
if (process.client) {
  const limit = isDesktop() ? 10 : 3
  await useAsyncData(() => fetchContractEvents({
    queryParameters: `/v2/contracts/logs?contract_id=${route.params.id}&limit=${limit}`,
  }))
}
</script>

<style scoped>
.contract-details__panel {
  margin-bottom: var(--space-6);

  &:last-of-type {
    margin-bottom: 0;
  }
}
</style>
