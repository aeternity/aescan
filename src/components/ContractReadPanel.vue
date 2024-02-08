<template>
  <app-panel v-if="aciFunctions">
    <h3 class="contract-read-panel__title">
      Read Smart Contract Information
    </h3>
    <app-accordion :items="aciFunctions">
      <template #content="{content: {item: aciItem, index}}">
        <p>
          {{ aciItem.returns }}
        </p>
        <hr>
        <form @submit.prevent="fetchFunctionResponse(aciItem, index)">
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
import { useAesdk } from '@/stores/aesdk'

const { verificationDetails, aciFunctions } = storeToRefs(useContractVerifiedStore())
const { contractDetails } = storeToRefs(useContractDetailsStore())
const { aeSdk } = storeToRefs(useAesdk())

const response = ref([])
const form = ref({})

async function fetchFunctionResponse(aciItem, index) {
  console.log('fetchFunctionResponse')

  const contractInstance = await aeSdk.value.initializeContract({
    aci: [JSON.parse(verificationDetails.value.aci)[3]],
    address: contractDetails.value.id,
  })
  console.log('contractInstance', contractInstance)
  const contractCallResult = await contractInstance[aciItem.name]({ callStatic: true })
  console.log('contractCallResult?.decodedResult', contractCallResult.decodedResult)
  response.value = { [index]: formatResponse(contractCallResult.decodedResult, aciItem.returns) }
  console.log('response', response.value, aciItem.returns)
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
