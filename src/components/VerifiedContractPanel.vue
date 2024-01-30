<template>
  <app-panel>
    <template v-if="isVerified">
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
    </template>
    <blank-state v-else>
      Smart Contract is not verified. Go to
      <app-link to="/contract-verification">
        Contract Verification
      </app-link>
      to verify it.
    </blank-state>
  </app-panel>
  <!--  todo print loop-->
</template>

<script setup>

import { storeToRefs } from 'pinia'
import { useContractVerifiedStore } from '~/stores/verified'

const contractVerifiedStore = useContractVerifiedStore()
const { contractCode, verificationDetails, isVerified } = storeToRefs(contractVerifiedStore)
const { fetchContractCode } = contractVerifiedStore
const route = useRoute()
if (isVerified.value) {
  await fetchContractCode(route.params.id)
}

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
