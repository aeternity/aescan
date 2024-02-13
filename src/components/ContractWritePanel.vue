<template>
  <app-panel>
    <template v-if="aciWriteEntrypoints">
      <h3 class="contract-write-panel__title">
        Write Smart Contract Information
      </h3>
      <div class="contract-write-panel__container">
        <the-wallet-account-controls/>
        <hint-tooltip>
          {{ contractVerifiedHints.connectWallet }}
        </hint-tooltip>
      </div>
      <contract-entrypoint-accordion
        :is-disabled="!walletSdk"
        :entrypoints="aciWriteEntrypoints"
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
import { useWalletStore } from '@/stores/wallet'
import { contractVerifiedHints } from '~/utils/hints/contractVerifiedHints'

const { contractDetails } = storeToRefs(useContractDetailsStore())
const { aeSdk: walletSdk } = storeToRefs(useWalletStore())

const contractVerifiedStore = useContractVerifiedStore()
const { aciWriteEntrypoints, aciObject } = storeToRefs(contractVerifiedStore)
const { getEntrypointResponse, parseArguments } = contractVerifiedStore

const response = ref([])
const loadingIndex = ref(null)

async function getContractInstance() {
  return await walletSdk.value.initializeContract({
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
