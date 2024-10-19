<template>
  <app-panel>
    <template v-if="aciWriteEntrypoints.length > 0">
      <h3 class="contract-write-panel__title">
        Write Smart Contract Information
      </h3>
      <div class="contract-write-panel__container">
        <wallet-account-controls
          :backlink="route.fullPath"
          :has-menu="false"/>
        <hint-tooltip>
          {{ contractVerifiedHints.connectWallet }}
        </hint-tooltip>
      </div>
      <contract-entrypoint-accordion
        :is-disabled="!canWrite"
        :entrypoints="aciWriteEntrypoints"
        :loading-index="loadingIndex"
        :response="response"
        @query-clicked="getEntrypointResponse"/>
    </template>
    <blank-state v-else/>
  </app-panel>
</template>

<script setup>
import { useContractVerifiedStore } from '@/stores/contractVerified'
import { useContractDetailsStore } from '@/stores/contractDetails'
import { contractVerifiedHints } from '@/utils/hints/contractVerifiedHints'

const contractVerifiedStore = useContractVerifiedStore()
const contractDetailStore = useContractDetailsStore()

const { aciWriteEntrypoints } = storeToRefs(contractVerifiedStore)

const {
  fetchEntrypointResponse,
  parseArguments,
  parseResponse,
  getContract,
  canWrite,
} = contractVerifiedStore

const { fetchContractEvents, fetchContractCallTransactions } = contractDetailStore

const route = useRoute()

const response = ref([])
const loadingIndex = ref(null)

async function getEntrypointResponse(aciItem, index, form) {
  loadingIndex.value = index
  const args = parseArguments(aciItem, form)
  const contract = await getContract()
  const fetchedResponse = await fetchEntrypointResponse(contract, aciItem, args)
  response.value[index] = parseResponse(fetchedResponse)
  loadingIndex.value = null
  await updateContractEvents()
}

async function updateContractEvents() {
  // UX = event is visible in the other tabs after query
  await fetchContractEvents({})
  await fetchContractCallTransactions({})
}
</script>

<style scoped>
.contract-write-panel {
  &__container {
    display: flex;
    align-items: center;
    gap: var(--space-1);
    margin-bottom: var(--space-3);
  }

  &__title {
    margin-bottom: var(--space-2);
  }
}
</style>
