<template>
  <app-panel>
    <h3>Verification details</h3>
    isVerified {{ isVerified }}
    <hr>
    verificationDetails {{ verificationDetails }}
    <verified-contract-table/>
    <header class="verification-contract-panel__header">
      <h3>Contract Code</h3>
      <div>
        <app-button variant="light">
          Show Bytcode
        </app-button>
        <app-button variant="light">
          Export
        </app-button>
      </div>
    </header>
    <verified-contract-editor/>
  </app-panel>
</template>
<script setup>
import VerifiedContractTable from '~/components/VerifiedContractTable'
import { useContractVerifiedStore } from '~/stores/contractVerified'

const route = useRoute()

const contractVerifiedStore = useContractVerifiedStore()
const { isVerified, verificationDetails } = storeToRefs(contractVerifiedStore)
const { fetchIsContractVerified } = contractVerifiedStore

await fetchIsContractVerified(route.params.id)

</script>

<style scoped>
.verification-contract-panel {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-1);
  }
}
</style>
