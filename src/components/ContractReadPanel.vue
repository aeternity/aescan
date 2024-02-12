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
            Query
          </button>
        </form>
        <hr>
        <span v-if="response[index]">
          <!--          todo label return vs error-->
          Return value: {{ response[index] }}
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

  const contractInstance = await aeSdk.value.initializeContract({
    aci: [JSON.parse(verificationDetails.value.aci)[3]],
    address: contractDetails.value.id,
  })

  let contractCallResult
  try {
    contractCallResult = await contractInstance[aciItem.name]({ callStatic: true })
    response.value[index] = formatResponse(contractCallResult.decodedResult, aciItem.returns)
  } catch (error) {
    console.log('Error in fetchFunctionResponse:', error)
    // todo signalize error in UI
    response.value[index] = error
  }

  loadingIndex.value = null
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
