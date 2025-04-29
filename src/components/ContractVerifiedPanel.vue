<template>
  <app-panel>
    <template
      v-if="isVerified"
      #title>
      Verification Details
    </template>
    <template v-if="isVerified">
      <contract-verified-table
        :verification-details="verificationDetails"
        :is-verified="isVerified"
        class="contract-verified-panel__table"/>

      <div class="contract-verified-panel__container">
        <h3 class="contract-verified-panel__title">
          Contract Code
        </h3>

        <template
          v-for="(code, index) in contractCode.source"
          :key="index">
          <header class="contract-verified-panel__header">
            <div class="contract-verified-panel__file">
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
      </div>
    </template>
    <blank-state v-else>
      Smart Contract is not verified. Go to
      <app-link to="/contract-verification">
        Smart Contract Verification
      </app-link>
      to verify it.
    </blank-state>
  </app-panel>
</template>

<script setup>
const { contractCode, verificationDetails, isVerified } = storeToRefs(useContractVerifiedStore())
const { fetchContractCode } = useContractVerifiedStore()

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
    margin: var(--space-1);
  }

  &__table {
    margin-bottom: var(--space-5);
  }

  &__file {
    display: flex;
    align-items: center;
    gap: var(--space-1);
  }

  &__code-editor {
    margin: var(--space-2) 0 var(--space-5);
  }

  &__title {
    margin-bottom: var(--space-1);
  }
}
</style>
