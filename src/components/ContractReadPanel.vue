<template>
  <app-panel>
    <template v-if="aciReadEntrypoints">
      <h3 class="contract-read-panel__title">
        Read Smart Contract Information
      </h3>
      <contract-entrypoint-accordion
        :entrypoints="aciReadEntrypoints"
        :loading-index="loadingIndex"
        :response="response"
        @query-clicked="getEntrypointResponse"/>
    </template>
    <blank-state v-else/>
  </app-panel>
</template>

<script setup>
import { useContractVerifiedStore } from '@/stores/contractVerified'

const contractVerifiedStore = useContractVerifiedStore()
const { aciReadEntrypoints } = storeToRefs(contractVerifiedStore)
const {
  fetchEntrypointResponse,
  getReadContractInstance,
  parseArguments,
  parseResponse,
} = contractVerifiedStore

const response = ref([])
const loadingIndex = ref(null)

async function getEntrypointResponse(aciItem, index, form) {
  loadingIndex.value = index
  const args = parseArguments(aciItem, form)
  const contractInstance = await getReadContractInstance()
  const fetchedResponse = await fetchEntrypointResponse(contractInstance, aciItem, args)
  response.value[index] = parseResponse(fetchedResponse)
  loadingIndex.value = null
}

</script>

<style scoped>
.contract-read-panel__title {
  margin-bottom: var(--space-2);
}
</style>
