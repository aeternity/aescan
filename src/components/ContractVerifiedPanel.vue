<template>
  <app-panel>
    <template v-if="isVerified">
      <h3>Verification details</h3>
      <contract-verified-table
        :verification-details="verificationDetails"
        :is-verified="isVerified"/>
      <h3 class="contract-verified-panel__title">
        Contract Code
      </h3>
      <div
        v-for="code in contractCode.source"
        :key="code.filePath">
        <header class="contract-verified-panel__header">
          <div class="contract-verified-panel__container">
            <h4>{{ code.filePath }}</h4>
            <app-chip
              v-if="code.isEntryFile"
              size="sm">
              entry file
            </app-chip>
          </div>
          <div>
            <app-button variant="light">
              Export
            </app-button>
          </div>
        </header>
        <code-editor
          class="contract-verified-panel__code-editor"
          :code="code.content"
          lang="aes"/>
      </div>
      <h3 class="contract-verified-panel__title">
        ACI
      </h3>
      <code-editor
        class="contract-verified-panel__code-editor"
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
</template>

<script setup>

import { storeToRefs } from 'pinia'
import { useContractVerifiedStore } from '@/stores/contractVerified'

const contractVerifiedStore = useContractVerifiedStore()
const { contractCode, verificationDetails, isVerified } = storeToRefs(contractVerifiedStore)
const { fetchContractCode } = contractVerifiedStore
const route = useRoute()
if (isVerified.value) {
  await fetchContractCode(route.params.id)
}

</script>

<style scoped>
.contract-verified-panel {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__container {
    display: flex;
    align-items: center;
    gap: 8px
  }

  &__code-editor {
    margin: var(--space-2) 0 var(--space-5);
  }

  &__title {
    margin-bottom: var(--space-1);
  }
}
</style>
