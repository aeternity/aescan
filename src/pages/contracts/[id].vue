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
      v-if="contractDetails"
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
        v-if="featureFlags.smartContractVerification"
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
import { contractsHints } from '@/utils/hints/contractsHints'

const { contractDetails } = storeToRefs(useContractDetailsStore())
const { fetchContractDetails, fetchContractEvents } = useContractDetailsStore()

const { isVerified } = storeToRefs(useContractVerifiedStore())
const { fetchVerificationDetail } = useContractVerifiedStore()

const featureFlags = useFeatureFlags()

const { push, replace } = useRouter()
const route = useRoute()

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
  await useAsyncData(() => fetchContractEvents({
    queryParameters: `/contracts/logs?contract_id=${route.params.id}&limit=10&aexn-args=true`,
  }))

  if (featureFlags.smartContractVerification) {
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
