<template>
  <app-panel class="tokens-panel">
    <header class="tokens-panel__header">
      <token-select v-model="selectedTokensName"/>
      <!--  todo counter?-->
    </header>
    <tokens-table
      v-if="selectedTokens"
      class="tokens-panel__table"
      :tokens="selectedTokens"/>
    <tokens-table-condensed
      v-if="selectedTokens"
      class="tokens-panel__table-condensed"
      :tokens="selectedTokens"/>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useTokensStore } from '~/stores/tokens'
import TokensTableCondensed from '~/components/TokensTableCondensed.vue'

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

  &__header {
    display: flex;
    justify-content: flex-end;
  }

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
