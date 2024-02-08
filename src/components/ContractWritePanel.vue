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
          Response: {{ response[index] }}
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

async function fetchCall(functionName, index) {
  // console.log('JSON.parse(verificationDetails.value.aci)[3]', JSON.parse(verificationDetails.value.aci)[3])
  console.log('fetchCall')
  console.log('walletSdk.value', walletSdk.value)
  const contractInstance = await walletSdk.value.initializeContract({
    aci: [JSON.parse(verificationDetails.value.aci)[3]],
    address: contractDetails.value.id,
  })
  console.log('contractInstance', contractInstance)
  console.log('form.value', form.value)
  const contractCallResult = await contractInstance[functionName](form.value['add_test_value-one'], form.value['add_test_value-two'])
  console.log('contractCallResult?.decodedResult', contractCallResult.decodedResult)
  response.value = { [index]: new BigNumber(contractCallResult) }
  console.log('response', response.value)
}
</script>
