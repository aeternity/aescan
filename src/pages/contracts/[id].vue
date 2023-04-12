<template>
  <div class="contract-details">
    <Head>
      <Title>{{ APP_TITLE_SHORT }} | Smart Contract</Title>
    </Head>
    <div
      v-if="contractDetails"
      class="contract-details__parallax">
      <page-header>
        Smart Contract
      </page-header>

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
    </div>
  </div>
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
.contract-details {
  background-image: url("@/assets/background.svg");
  background-color: var(--color-midnight-35);
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  &__parallax {
    padding: 120px var(--space-1) var(--space-6);
    max-width: var(--container-width);
    margin: 0 auto;
    @media (--desktop) {
      padding: 120px 0;
    }
  }

  &__panel {
    margin-bottom: var(--space-6);

    &:last-of-type {
      margin-bottom: 0;
    }
  }
}
</style>
