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
        :is-disabled="!isWritable"
        :entrypoints="aciWriteEntrypoints"
        :loading-index="loadingIndex"
        :response="response"
        @query-clicked="getEntrypointResponse"/>
    </template>
    <blank-state v-else/>
  </app-panel>
</template>

<script setup>
import { contractVerifiedHints } from '@/utils/hints/contractVerifiedHints'

const { aciWriteEntrypoints } = storeToRefs(useContractVerifiedStore())

const {
  fetchEntrypointResponse,
  parseArguments,
  parseResponse,
  isWritable,
} = useContractVerifiedStore()

const { fetchContractEvents, fetchContractCallTransactions } = useContractDetailsStore()

const route = useRoute()

const response = ref([])
const loadingIndex = ref(null)

async function getEntrypointResponse(aciItem, index, form) {
  loadingIndex.value = index
  const args = parseArguments(aciItem, form)
  const contractInstance = await getWriteContractInstance()
  const fetchedResponse = await fetchEntrypointResponse(contractInstance, aciItem, args)
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
