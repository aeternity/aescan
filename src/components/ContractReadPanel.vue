<template>
  <app-panel>
    <h3 class="contract-read-panel__title">
      Read Smart Contract Information
    </h3>
    <div
      v-for="(aciFunction, index) in aciFunctions"
      :key="index"
      class="contract-read-panel__accordion">
      <header
        :class="[
          'contract-read-panel__header',
          {'contract-read-panel__header--expanded' : accordionMap[index] }]"
        @click="toggle(index)">
        {{ aciFunction.name }}
      </header>
      <div
        v-show="accordionMap[index]"
        class="contract-read-panel__content">
        <p>
          {{ aciFunction.returns }}
        </p>
        <hr>
        <form @submit.prevent="fetchFunctionResponse(aciFunction.name, index)">
          <input
            v-for="argument in aciFunction.arguments"
            :id="aciFunction.name + '-' + argument.name"
            v-model="form[aciFunction.name + '-' + argument.name]"
            :name="aciFunction.name + '-' + argument.name"
            :placeholder="argument.type"
            type="text">
          <button type="submit">
            Call Locally
          </button>
        </form>
        <hr>
        <span v-if="response[index]">
          Response {{ response }}
        </span>
      </div>
    </div>
  </app-panel>
  accordionMap {{ accordionMap }}
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
const accordionMap = ref(Array(aciFunctions.value.length).fill(true))

function toggle(index) {
  accordionMap.value[index] = !aciFunctions.value[index]
}

async function fetchFunctionResponse(functionName, index) {
  // console.log('JSON.parse(verificationDetails.value.aci)[3]', JSON.parse(verificationDetails.value.aci)[3])
  console.log('fetchFunctionResponse')

  const contractInstance = await aeSdk.value.initializeContract({
    aci: [JSON.parse(verificationDetails.value.aci)[3]],
    address: contractDetails.value.id,
  })
  console.log('contractInstance', contractInstance)
  const contractCallResult = await contractInstance[functionName]({ callStatic: true })
  console.log('contractCallResult?.decodedResult', contractCallResult.decodedResult)
  response.value = { [index]: new BigNumber(contractCallResult) }
  console.log('response', response.value)
}
</script>

<style scoped>
.contract-read-panel {
  &__title {
    margin-bottom: var(--space-2);
  }

  &__accordion {
    border: 1px solid var(--color-gray);
    border-radius: 8px;
    margin-bottom: var(--space-4);
  }

  &__header {
    background: var(--color-snow);
    padding: 8px;
    border-radius: 8px;
    cursor: pointer;

    &--expanded {
      border-bottom: 1px solid var(--color-gray);
      border-radius: 8px 8px 0 0;
    }
  }

  &__content {
    padding: 8px;
  }
}
</style>
