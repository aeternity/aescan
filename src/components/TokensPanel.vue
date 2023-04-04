<template>
  <app-panel class-name="tokens-panel">
    <token-select v-model="selectedTokensName"/>
    <tokens-table
      v-if="selectedTokensName"
      :tokens="selectedTokens"/>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useTokensStore } from '~/stores/tokens'

const tokensStore = useTokensStore()
const {
  listedTokens,
  unlistedTokens,
} = storeToRefs(tokensStore)

const selectedTokensName = ref({ label: 'Listed', val: 'listedTokens' })
const selectedTokens = computed(() => selectedTokensName.value.val === 'listedTokens' ? listedTokens.value : unlistedTokens.value)

</script>

<style scoped>
.tokens-panel {
  padding: var(--space-4) var(--space-1);

  @media (--desktop) {
    padding: var(--space-4);
  }

  &__table {
    display: none;
    @media (--desktop) {
      display: revert;
    }
  }

  &__table-condensed {
    @media (--desktop) {
      display: none;
    }
  }
}
</style>
