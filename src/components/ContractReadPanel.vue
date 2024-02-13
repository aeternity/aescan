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
        @clicked="fetchEntrypointResponse"/>
    </template>
    <blank-state v-else/>
  </app-panel>
</template>

<script setup>
import { useContractVerifiedStore } from '@/stores/contractVerified'
import { useContractDetailsStore } from '@/stores/contractDetails'
import { useAesdk } from '@/stores/aesdk'

const contractVerifiedStore = useContractVerifiedStore()
const { aciReadEntrypoints, aciObject } = storeToRefs(contractVerifiedStore)
const { getEntrypointResponse, parseArguments } = contractVerifiedStore

const { contractDetails } = storeToRefs(useContractDetailsStore())
const { aeSdk } = storeToRefs(useAesdk())

const response = ref([])
const loadingIndex = ref(null)

async function getContractInstance() {
  return await aeSdk.value.initializeContract({
    aci: [aciObject.value],
    address: contractDetails.value.id,
  })
}

async function fetchEntrypointResponse(aciItem, index, form) {
  loadingIndex.value = index
  const args = parseArguments(aciItem, form)
  const contractInstance = await getContractInstance()
  response.value[index] = await getEntrypointResponse(contractInstance, aciItem, args)
  loadingIndex.value = null
}
</script>

<style scoped>
.contract-read-panel__title {
  margin-bottom: var(--space-2);
}
</style>
