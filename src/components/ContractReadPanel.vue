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
          {'contract-read-panel__header--expanded' : aciFunction.isExpanded }]"
        @click="toggle(index)">
        {{ aciFunction.name }}
      </header>
      <div
        v-show="aciFunction.isExpanded"
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
          <button
            type="submit">
            {{ aciFunction.stateful ? 'Call Locally' : 'Send Transaction' }}
          </button>
        </form>
        <hr>
        <span v-if="response[index]">
          Response {{ response }}
        </span>
      </div>
    </div>
    <h3 class="contract-read-panel__title">
      Write Smart Contract Information
    </h3>
    <app-button>
      Connect Wallet
    </app-button>
    <the-wallet-account-controls class="u-hidden-mobile"/>
    <div
      v-for="(aciFunction, index) in aciStatefulFunctions"
      :key="index"
      class="contract-read-panel__accordion">
      <header
        :class="[
          'contract-read-panel__header',
          {'contract-read-panel__header--expanded' : aciFunction.isExpanded }]"
        @click="toggle(index)">
        {{ aciFunction.name }}
      </header>
      <div
        v-show="aciFunction.isExpanded"
        class="contract-read-panel__content">
        <p>
          {{ aciFunction.returns }}
        </p>
        <hr>
        <form @submit.prevent="fetchCall(aciFunction.name, index)">
          <input
            v-for="argument in aciFunction.arguments"
            :id="aciFunction.name + '-' + argument.name"
            v-model="form[aciFunction.name + '-' + argument.name]"
            :name="aciFunction.name + '-' + argument.name"
            :placeholder="argument.type"
            type="text">
          <button
            type="submit">
            {{ aciFunction.stateful ? 'Call Locally' : 'Send Transaction' }}
          </button>
        </form>
        <hr>
        <span v-if="response[index]">
          Response {{ response }}
        </span>
      </div>
    </div>
  </app-panel>
  <div
    v-for="(aciFunction, index) in aciFunctions"
    :key="index"
    class="contract-read-panel__accordion">
    {{ aciFunction }}
    <div/>
  </div>
  <hr>
  form: {{ form }}
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { BigNumber } from 'bignumber.js'
import { useContractVerifiedStore } from '~/stores/contractVerified'
import { useAesdk } from '~/stores/aesdk'
import { useContractDetailsStore } from '@/stores/contractDetails'
import { useWalletStore } from '~/stores/wallet'

const { aeSdk: sdk } = storeToRefs(useAesdk())

const { aeSdk } = storeToRefs(useWalletStore())

const contractVerifiedStore = useContractVerifiedStore()
const { verificationDetails } = storeToRefs(contractVerifiedStore)

const contractDetailsStore = useContractDetailsStore()
const { contractDetails } = storeToRefs(contractDetailsStore)

const aciFunctions = ref()
const aciStatefulFunctions = ref()
const response = ref([])
const form = ref({})

onMounted(() => {
  // todo move to store
  const functions = JSON.parse(verificationDetails.value.aci)[3].contract.functions
  functions.forEach(func => {
    func.isExpanded = true
  })

  function myCallback(aciFunction) {
    return !aciFunction.stateful
  }

  const result2 = Object.groupBy(functions, myCallback)
  console.log('result2', result2)
  aciFunctions.value = result2.true
  aciStatefulFunctions.value = result2.false
})

function toggle(index) {
  aciFunctions.value[index].isExpanded = !aciFunctions.value[index].isExpanded
}

async function fetchFunctionResponse(functionName, index) {
  // console.log('JSON.parse(verificationDetails.value.aci)[3]', JSON.parse(verificationDetails.value.aci)[3])
  console.log('fetchFunctionResponse')
  console.log('aeSdk.value', aeSdk.value)

  const contractInstance = await sdk.value.initializeContract({
    aci: [JSON.parse(verificationDetails.value.aci)[3]],
    address: contractDetails.value.id,
  })
  console.log('contractInstance', contractInstance)
  const contractCallResult = await contractInstance[functionName]({ callStatic: true })
  console.log('contractCallResult?.decodedResult', contractCallResult.decodedResult)
  response.value = { [index]: new BigNumber(contractCallResult) }
  console.log('response', response.value)
}

async function fetchCall(functionName, index) {
  // console.log('JSON.parse(verificationDetails.value.aci)[3]', JSON.parse(verificationDetails.value.aci)[3])
  console.log('fetchCall')
  console.log('aeSdk.value', aeSdk.value)
  const contractInstance = await aeSdk.value.initializeContract({
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
