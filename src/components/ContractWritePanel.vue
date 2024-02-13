<template>
  <app-panel>
    <template v-if="aciWriteEntrypoints">
      <h3 class="contract-write-panel__title">
        Write Smart Contract Information
      </h3>
      <div class="contract-write-panel__container">
        <the-wallet-account-controls/>
        <hint-tooltip>{{ contractVerifiedHints.connectWallet }}</hint-tooltip>
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

const { aciWriteEntrypoints, aciObject } = storeToRefs(useContractVerifiedStore())
const { contractDetails } = storeToRefs(useContractDetailsStore())
const { aeSdk: walletSdk } = storeToRefs(useWalletStore())

const response = ref([])
const loadingIndex = ref(null)

async function getContractInstance() {
  return await walletSdk.value.initializeContract({
    aci: [aciObject.value],
    address: contractDetails.value.id,
  })
}

async function fetchEntrypointResponse(aciItem, index, form) {
  console.log('aciItem, index', aciItem, index, form)
  loadingIndex.value = index
  const args = parseArguments(aciItem, form)
  const contractInstance = await getContractInstance()
  response.value[index] = await getEntrypointResponse(contractInstance, aciItem, args)
  loadingIndex.value = null
}

async function getEntrypointResponse(contractInstance, aciItem, args) {
  try {
    const contractCallResult = await contractInstance[aciItem.name](...args)
    return {
      responseType: 'success',
      message: formatEntrypointResponse(contractCallResult.decodedResult, aciItem.returns),
    }
  } catch (error) {
    return {
      responseType: 'error',
      message: error,
    }
  }
}

function parseArguments(aciItem, form) {
  const argumentNames = aciItem.arguments.map(argument => aciItem.name + '-' + argument.name)
  return argumentNames.map(name => form.value[name])
}
</script>

<style scoped>
.contract-write-panel {
  &__container {
    display: flex;
    align-items: center;
    gap: var(--space-1);
    margin-bottom: var(--space-2);
  }

  &__title {
    margin-bottom: var(--space-2);
  }
}
</style>
