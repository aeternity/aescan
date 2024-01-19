<template>
  <app-panel v-if="isVerified">
    <h3>Verification details</h3>
    <verified-contract-table
      :verification-details="verificationDetails"
      :is-verified="isVerified"/>
    <header class="verification-contract-panel__header">
      <h3>Contract Code</h3>
      <div>
        <app-button variant="light">
          Export
        </app-button>
      </div>
    </header>
    <verified-contract-editor
      :code="contractCode.source[0].content"
      lang="aes"/>
    <h3>ACI</h3>
    <verified-contract-editor
      :code="verificationDetails.aci"
      lang="json"/>
  </app-panel>
  <div v-else>
    Not verified: HINT
  </div>

  <!--  todo print loop-->
</template>

<script setup>

import { storeToRefs } from 'pinia'
import { useContractVerifiedStore } from '~/stores/verified'

const contractVerifiedStore = useContractVerifiedStore()
const { contractCode } = storeToRefs(contractVerifiedStore)
const { fetchContractCode } = contractVerifiedStore
const route = useRoute()
await fetchContractCode(route.params.id)

defineProps({
  verificationDetails: {
    required: true,
    type: Object,
  },
  isVerified: {
    required: true,
    type: Object,
  },
})

</script>

<style scoped>
/*//todo fix naming*/
.verification-contract-panel {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-1);
  }
}
</style>
