<template>
  <app-panel v-if="aciFunctions">
    <h3 class="contract-read-panel__title">
      Read Smart Contract Information
    </h3>
    <!-- todo reduce nesting-->
    <app-accordion :items="aciFunctions">
      <template #item="{item}">
        <p>
          {{ item.item.returns }}
        </p>
        <hr>
        <form @submit.prevent="fetchFunctionResponse(item.item, item.index)">
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
          Response: {{ response[item.index] }}
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

async function fetchFunctionResponse(fu, index) {
  // console.log('JSON.parse(verificationDetails.value.aci)[3]', JSON.parse(verificationDetails.value.aci)[3])
  console.log('fetchFunctionResponse')

  const contractInstance = await aeSdk.value.initializeContract({
    aci: [JSON.parse(verificationDetails.value.aci)[3]],
    address: contractDetails.value.id,
  })
  console.log('contractInstance', contractInstance)
  const contractCallResult = await contractInstance[fu.name]({ callStatic: true })
  console.log('contractCallResult?.decodedResult', contractCallResult.decodedResult)
  // todo conditional formatting
  response.value = { [index]: formatResponse(contractCallResult.decodedResult, fu.returns) }
  console.log('response', response.value, fu.returns)
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
