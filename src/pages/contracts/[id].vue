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
      :is-verified="isVerified"
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
        v-if="!featureFlags.isHyperchain"
        title="Verification"
        :has-verified-icon="isVerified">
        <contract-verified-panel/>
      </app-tab>
      <app-tab
        v-if="isVerified"
        title="Read Contract">
        <contract-read-panel/>
      </app-tab>
      <app-tab
        v-if="isVerified"
        title="Write Contract">
        <contract-write-panel/>
      </app-tab>
    </app-tabs>
  </template>
  <loader-panel v-else/>
</template>

<script setup>
import { storeToRefs } from 'pinia'

import { useContractDetailsStore } from '@/stores/contractDetails'
import { useContractVerifiedStore } from '@/stores/contractVerified'
import { isDesktop } from '@/utils/screen'
import { contractsHints } from '@/utils/hints/contractsHints'
import useFeatureFlags from '@/composables/useFeatureFlags'

const contractDetailsStore = useContractDetailsStore()
const { contractDetails } = storeToRefs(contractDetailsStore)
const { fetchContractDetails, fetchContractEvents } = contractDetailsStore
const contractVerifiedStore = useContractVerifiedStore()
const { isVerified } = storeToRefs(contractVerifiedStore)
const { fetchVerificationDetail } = contractVerifiedStore
const { push, replace } = useRouter()
const route = useRoute()
const featureFlags = useFeatureFlags()

const TAB_KEYS = ['call-transactions', 'events', 'contract-verified', 'contract-read', 'contract-write']

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
    queryParameters: `/v3/contracts/logs?contract_id=${route.params.id}&limit=${limit}&aexn-args=true`,
  }))

  if (!featureFlags.isHyperchain) {
    await fetchVerificationDetail(route.params.id)
  }
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
