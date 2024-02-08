<template>
  <app-panel v-if="aciStatefulFunctions">
    <h3 class="contract-read-panel__title">
      Write Smart Contract Information
    </h3>

    <the-wallet-account-controls/>

    <app-accordion :items="aciStatefulFunctions">
      <template
        #item="{item}">
        {{ item }}

        <p>
          {{ item.item.returns }}
        </p>
        <hr>
        <form @submit.prevent="fetchCall(item.item.name, item.index)">
          <input
            v-for="argument in item.item.arguments"
            :id="item.item.name + '-' + argument.name"
            :key="item.item.name"
            v-model="form[item.item.name + '-' + argument.name]"
            :name="item.item.name + '-' + argument.name"
            :placeholder="argument.type"
            type="text">
          <button type="submit">
            Call Locally
          </button>
        </form>
        <hr>
        <span v-if="response[item.index]">
          Response {{ response }}
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
