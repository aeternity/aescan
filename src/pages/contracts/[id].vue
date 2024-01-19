<template>
  <Head>
    <Title>Smart Contract</Title>
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

    <app-tabs
      v-if="contractDetails"
      v-model="activeTabIndex">
      <app-tab title="Call Transactions">
        <contract-call-transactions-panel/>
      </app-tab>
      <app-tab title="Events">
        <contract-events-panel/>
      </app-tab>
      <app-tab
        title="Contract"
        :has-verified-icon="isVerified">
        <verified-contract-panel
          v-if="verificationDetails"
          :is-verified="isVerified"
          :verification-details="verificationDetails"/>
      </app-tab>
    </app-tabs>
  </template>
  <loader-panel v-else/>
</template>

<script setup>
import { storeToRefs } from 'pinia'

import { useContractDetailsStore } from '@/stores/contractDetails'
import { useContractVerifiedStore } from '@/stores/verified'
import { isDesktop } from '@/utils/screen'
import { contractsHints } from '@/utils/hints/contractsHints'

const contractDetailsStore = useContractDetailsStore()
const { contractDetails } = storeToRefs(contractDetailsStore)
const { fetchContractDetails, fetchContractEvents } = contractDetailsStore
const contractVerifiedStore = useContractVerifiedStore()
const { isVerified, verificationDetails } = storeToRefs(contractVerifiedStore)
const { fetchIsContractVerified } = contractVerifiedStore
const { push, replace } = useRouter()
const route = useRoute()

await fetchIsContractVerified(route.params.id)

const TAB_KEYS = ['call-transactions', 'events', 'verified-contract']

const activeTabIndex = computed({
  get() {
    const { type: activeTabName } = route.query

    if (activeTabName === undefined) {
      return 0
    }

    return TAB_KEYS.indexOf(activeTabName)
  },
  set(index) {
    const newRoute = {
      query: {
        type: TAB_KEYS[index],
      },
    }

    if (activeTabIndex.value === index) {
      // if navigating back
      return replace(newRoute)
    }

    return push(newRoute)
  },
})

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
    queryParameters: `/v2/contracts/logs?contract_id=${route.params.id}&limit=${limit}&aexn-args=true`,
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
