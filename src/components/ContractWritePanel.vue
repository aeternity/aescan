<template>
  <app-panel v-if="aciWriteFunctions">
    <h3 class="contract-read-panel__title">
      Write Smart Contract Information
    </h3>
    <the-wallet-account-controls/>
    <!--    todo print hint-->

    <app-accordion
      :is-disabled="!walletSdk"
      :items="aciWriteFunctions">
      <template #content="{content: {item: aciItem, index}}">
        <div class="contract-read-panel__container">
          <p>
            return type: <i>{{ aciItem.returns }}</i>
          </p>
          <input
            v-for="(argument, inputIndex) in aciItem.arguments"
            :key="inputIndex"
            v-model="form[aciItem.name + '-' + argument.name]"
            class="contract-read-panel__input"
            :placeholder="argument.type"
            type="text">

          <loader-indicator-small v-if="loadingIndex === index"/>

          <app-button
            v-else
            type="submit"
            @click="fetchCall(aciItem, index)">
            Query
          </app-button>

          <p
            v-if="response[index]"
            :class="[
              'contract-read-panel__response',
              {'contract-read-panel__response--error': response[index].responseType === 'error' }
            ]">
            {{ response[index].responseType === 'success' ? 'Return value' : 'Error' }}:
            {{ response[index].message }}
          </p>
        </div>
      </template>
    </app-accordion>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useContractVerifiedStore } from '@/stores/contractVerified'
import { useContractDetailsStore } from '@/stores/contractDetails'
import { useWalletStore } from '@/stores/wallet'

const { aciWriteFunctions, aciObject } = storeToRefs(useContractVerifiedStore())
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
    aci: [aciObject.value],
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
