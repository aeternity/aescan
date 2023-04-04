<template>
  <app-panel class="tokens-panel">
    <tokens-table :tokens="tokens"/>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useTokensStore } from '~/stores/tokens'
import TokensTable from '~/components/TokensTable.vue'

const tokensStore = useTokensStore()
const {
  tokens,
} = storeToRefs(tokensStore)

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
