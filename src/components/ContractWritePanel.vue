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
        :is-disabled="isDisabled"
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
const { contractDetails } = storeToRefs(contractDetailStore)

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

const isDisabled = computed(() => {
  const connectedAddress = walletSdk ? Object.keys(walletSdk._accounts.current)[0] : null
  return !walletSdk || contractDetails.value.createdBy !== connectedAddress
})

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
