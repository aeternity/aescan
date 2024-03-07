<template>
  <app-panel>
    <template v-if="aciWriteEntrypoints">
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
        :is-disabled="!walletSdk"
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
import { contractVerifiedHints } from '@/utils/hints/contractVerifiedHints'

const contractVerifiedStore = useContractVerifiedStore()
const { aciWriteEntrypoints } = storeToRefs(contractVerifiedStore)
const {
  fetchEntrypointResponse,
  parseArguments,
  parseResponse,
  getWriteContractInstance,
  walletSdk,
} = contractVerifiedStore

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
