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
          Show Bytcode
        </app-button>
        <app-button variant="light">
          Export
        </app-button>
      </div>
    </header>
    <verified-contract-editor :verification-details="verificationDetails"/>
  </app-panel>
  <div v-else>
    Not verified: HINT
  </div>
</template>

<script setup>
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
