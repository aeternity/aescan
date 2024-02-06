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
      class="contract-read-panel__container">
      <header
        :class="['contract-read-panel__header', {'contract-read-panel__header--expanded' : aciFunction.isExpanded }]"
        @click="toggle(index)">
        {{ aciFunction.name }}
      </header>
      <p
        v-show="aciFunction.isExpanded"
        class="contract-read-panel__content">
        {{ aciFunction.returns }}
      </p>
    </div>
  </app-panel>
</template>

<script setup>
import { useContractVerifiedStore } from '~/stores/contractVerified'

const contractVerifiedStore = useContractVerifiedStore()
const { verificationDetails } = storeToRefs(contractVerifiedStore)
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
</script>

<style scoped>
.contract-read-panel {
  &__title {
    margin-bottom: var(--space-2);
  }

  &__container {
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
