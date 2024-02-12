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
            :placeholder="argument.type.toString()"
            type="text">
          <button type="submit">
            Query
          </button>
        </form>
        <hr>
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
import { BigNumber } from 'bignumber.js'
import { useContractVerifiedStore } from '@/stores/contractVerified'
import { useContractDetailsStore } from '@/stores/contractDetails'
import { useAesdk } from '@/stores/aesdk'

const { verificationDetails, aciFunctions } = storeToRefs(useContractVerifiedStore())
const { contractDetails } = storeToRefs(useContractDetailsStore())
const { aeSdk } = storeToRefs(useAesdk())

const response = ref([])
const form = ref({})
const loadingIndex = ref(null)

async function fetchFunctionResponse(aciItem, index) {
  loadingIndex.value = index

  // todo JSON.parse(aci).find(item => item && item.contract)
  const contractInstance = await aeSdk.value.initializeContract({
    aci: [JSON.parse(verificationDetails.value.aci)[3]],
    address: contractDetails.value.id,
  })

  const argsNames = aciItem.arguments.map(arg => aciItem.name + '-' + arg.name)
  const args = argsNames.map(argName => form.value[argName])
  let contractCallResult

  try {
    contractCallResult = await contractInstance[aciItem.name](...args)
    response.value[index] = {
      responseType: 'success',
      message: formatResponse(contractCallResult.decodedResult, aciItem.returns),
    }
  } catch (error) {
    console.log('Error in fetchFunctionResponse:', error)

    response.value[index] = {
      responseType: 'error',
      message: error,
    }
  }
  console.log('response.value', response.value)
  loadingIndex.value = null
}

function formatResponse(value, type) {
  if (type === 'int') {
    return new BigNumber(value)
  }
  if (type === 'address') {
    return value
  }
  if (type === 'bool') {
    return value.toString()
  }
  return value
}
</script>

<style scoped>
.error {
  color: red;
}
</style>
