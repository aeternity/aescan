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
      <template
        v-for="(code, index) in contractCode.source"
        :key="index">
        <header class="contract-verified-panel__header">
          <div class="contract-verified-panel__container">
            <h4>file {{ index + 1 }} of {{ contractCode.source.length }}: {{ code.filePath }}</h4>
            <app-chip
              v-if="code.isEntryFile"
              size="sm">
              entry file
            </app-chip>
          </div>
        </header>
        <code-editor
          class="contract-verified-panel__code-editor"
          :code="code.content"
          lang="aes"/>
      </template>
      <header class="contract-verified-panel__header">
        <h3>
          ACI
        </h3>
        <app-button
          variant="light"
          @click="downloadFile(verificationDetails.aci)">
          Export
        </app-button>
      </header>
      <code-editor
        class="contract-verified-panel__code-editor"
        :code="verificationDetails.aci"
        lang="json"/>
      <header class="contract-verified-panel__header">
        <h3>
          Bytecode
        </h3>
      </header>
      <code-editor
        class="contract-verified-panel__code-editor"
        :code="contractDetails.bytecode"/>
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
import { useContractDetailsStore } from '@/stores/contractDetails'

const contractVerifiedStore = useContractVerifiedStore()
const { contractCode, verificationDetails, isVerified } = storeToRefs(contractVerifiedStore)
const { fetchContractCode } = contractVerifiedStore

const { contractDetails } = storeToRefs(useContractDetailsStore())

const route = useRoute()
if (isVerified.value) {
  await fetchContractCode(route.params.id)
}

function downloadFile(content) {
  const blob = new Blob([content], { type: 'text/plain' })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', 'contract.aci')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
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
