<template>
  <app-panel>
    <h3 class="contract-read-panel__title">
      Read Smart Contract Information
    </h3>
    <app-button>
      Connect Wallet
    </app-button>
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
        <app-button @click="fetchFunctionResponse()">
          {{ aciFunction.stateful ? 'Call Locally' : 'Send Transaction' }}
        </app-button>
      </div>
    </div>
  </app-panel>
  {{ verificationDetails.aci }}
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useContractVerifiedStore } from '~/stores/contractVerified'
import { useAesdk } from '~/stores/aesdk'
import { useContractDetailsStore } from '@/stores/contractDetails'

const { aeSdk } = storeToRefs(useAesdk())

const contractVerifiedStore = useContractVerifiedStore()
const { verificationDetails } = storeToRefs(contractVerifiedStore)

const contractDetailsStore = useContractDetailsStore()
const { contractDetails } = storeToRefs(contractDetailsStore)

const aciFunctions = ref()

onMounted(() => {
  // todo move to store
  const functions = JSON.parse(verificationDetails.value.aci)[3].contract.functions
  functions.forEach(func => {
    func.isExpanded = false
  })
  aciFunctions.value = functions
})

function toggle(index) {
  aciFunctions.value[index].isExpanded = !aciFunctions.value[index].isExpanded
}

async function fetchFunctionResponse() {
  console.log('JSON.parse(verificationDetails.value.aci)[3]', JSON.parse(verificationDetails.value.aci)[3])
  const contractInstance = await aeSdk.value.initializeContract({
    aci: [JSON.parse(verificationDetails.value.aci)[3]],
    address: contractDetails.value.id,
  })
  console.log('contractInstance', contractInstance)
  const contractCallResult = await contractInstance.read_test_value({ callStatic: true })
  console.log('contractCallResult?.decodedResult', contractCallResult?.decodedResult)
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
