<template>
  <app-panel v-if="aciStatefulFunctions">
    <h3 class="contract-read-panel__title">
      Write Smart Contract Information
    </h3>
    <the-wallet-account-controls/>
    <!--    todo print hint-->

    <app-accordion
      :is-disabled="!walletSdk"
      :items="aciStatefulFunctions">
      <template #content="{content: {item: aciItem, index}}">
        <p>
          {{ aciItem.returns }}
        </p>
        <form @submit.prevent="fetchCall(aciItem, index)">
          <input
            v-for="(argument, inputIndex) in aciItem.arguments"
            :key="inputIndex"
            v-model="form[aciItem.name + '-' + argument.name]"
            class="input"
            :placeholder="argument.type"
            type="text">
          <button type="submit">
            Query
          </button>
        </form>
        <span v-if="response[index]">
          <span :class="[{'error': response[index].responseType === 'error' }]">
            {{ response[index].responseType === 'success' ? 'Return value' : 'Error' }}:
            {{ response[index].message }}
          </span>
        </span>
        <loader-indicator-small v-if="loadingIndex === index"/>
      </template>
    </app-accordion>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useContractVerifiedStore } from '@/stores/contractVerified'
import { useContractDetailsStore } from '@/stores/contractDetails'
import { useWalletStore } from '@/stores/wallet'

const { verificationDetails, aciStatefulFunctions } = storeToRefs(useContractVerifiedStore())
const { contractDetails } = storeToRefs(useContractDetailsStore())
const { aeSdk: walletSdk } = storeToRefs(useWalletStore())

const response = ref([])
const form = ref({})
const loadingIndex = ref(null)

async function fetchCall(aciItem, index) {
  loadingIndex.value = index
  let contractCallResult
  const args = getArguments(aciItem)

  const contractInstance = await walletSdk.value.initializeContract({
    aci: [JSON.parse(verificationDetails.value.aci).find(item => item.contract)],
    address: contractDetails.value.id,
  })

  try {
    contractCallResult = await contractInstance[aciItem.name](...args)
    response.value[index] = {
      responseType: 'success',
      message: formatEntrypointResponse(contractCallResult.decodedResult, aciItem.returns),
    }
  } catch (error) {
    response.value[index] = {
      responseType: 'error',
      message: error,
    }
  }
  loadingIndex.value = null
}

function getArguments(aciItem) {
  const argumentNames = aciItem.arguments.map(argument => aciItem.name + '-' + argument.name)
  return argumentNames.map(name => form.value[name])
}
</script>

<style scoped>
.error {
  color: red;
}

.input {
  display: block;
}
</style>
