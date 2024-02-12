<template>
  <app-panel v-if="aciStatefulFunctions">
    <h3 class="contract-read-panel__title">
      Write Smart Contract Information
    </h3>
    <the-wallet-account-controls/>

    <app-accordion
      :is-disabled="!walletSdk"
      :items="aciStatefulFunctions">
      <template #content="{content: {item: aciItem, index}}">
        <p>
          {{ aciItem.returns }}
        </p>
        <hr>
        <form @submit.prevent="fetchCall(aciItem, index)">
          <input
            v-for="argument in aciItem.arguments"
            :id="aciItem.name + '-' + argument.name"
            :key="aciItem.name"
            v-model="form[aciItem.name + '-' + argument.name]"
            :name="aciItem.name + '-' + argument.name"
            :placeholder="argument.type"
            type="text">
          <button type="submit">
            Call Locally
          </button>
          <!--          // todo loeader-->
        </form>
        <hr>
        <span v-if="response[index]">
          Return value: {{ response[index] }}
        </span>
      </template>
    </app-accordion>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { BigNumber } from 'bignumber.js'
import { useContractVerifiedStore } from '@/stores/contractVerified'
import { useContractDetailsStore } from '@/stores/contractDetails'
import { useWalletStore } from '@/stores/wallet'

const { verificationDetails, aciStatefulFunctions } = storeToRefs(useContractVerifiedStore())
const { contractDetails } = storeToRefs(useContractDetailsStore())
const { aeSdk: walletSdk } = storeToRefs(useWalletStore())

const response = ref([])
const form = ref({})

async function fetchCall(aciItem, index) {
  const functionName = aciItem.name
  console.log('fetchCall')
  const contractInstance = await walletSdk.value.initializeContract({
    aci: [JSON.parse(verificationDetails.value.aci)[3]],
    address: contractDetails.value.id,
  })
  console.log('functionName', functionName)
  console.log('form.value', form.value)
  console.log('add_test_value-one', form.value['add_test_value-one'])

  const contractCallResult = await contractInstance[functionName](form.value['add_test_value-one'], form.value['add_test_value-two'])
  response.value[index] = formatResponse(contractCallResult.decodedResult, aciItem.returns)
  console.log('response', response.value)
}

function formatResponse(value, type) {
  if (type === 'int') {
    return new BigNumber(value)
  }
  if (type === 'address') {
    return value
  }
  return value
}
</script>
