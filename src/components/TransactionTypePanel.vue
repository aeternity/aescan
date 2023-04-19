<template>
  <app-panel class="transaction-type-panel">
    <header class="transaction-type-panel__header">
      <h2 class="transaction-type-panel__heading h3">
        {{ typeName }} DETAILS
      </h2>
      <div class="transaction-type-panel__container">
        <app-link
          v-if="transactionData.type === 'SpendTx' && transactionData.recipient?.account"
          :to="`/names/${transactionData.recipient.name}`">
          <app-chip>
            {{ transactionData.recipient.name }}
          </app-chip>
        </app-link>
        <template v-if="transactionData.type === 'PayingForTx'">
          <copy-chip
            class="transaction-type-panel__payer"
            :label="formatEllipseHash( transactionData.payer_id)"
            :clipboard-text=" transactionData.payer_id"/>
          <app-chip variant="primary">
            {{ transactionData.tx.tx.type }}
          </app-chip>
        </template>
        <template v-if="transactionData.type === 'GAMetaTx'">
          <copy-chip
            v-if="contractId"
            :label="formatEllipseHash(contractId)"
            :clipboard-text="contractId"/>

          <app-chip>
            {{ innerTransactionDetails.type }}
          </app-chip>
        </template>
      </div>
    </header>
    <component
      :is="transactionTypeTableComponent"
      :transaction-data="transactionData"/>
  </app-panel>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapActions, mapState } from 'pinia'
import AppPanel from '@/components/AppPanel'
import AppChip from '@/components/AppChip'
import AppLink from '@/components/AppLink'
import CopyChip from '@/components/CopyChip'
import { formatEllipseHash } from '@/utils/format'
import { useTransactionDetailsStore } from '@/stores/transactionDetails'

export default {
  name: 'TransactionTypePanel',
  components: {
    CopyChip,
    AppLink,
    AppChip,
    AppPanel,
  },
  props: {
    transactionData: {
      required: true,
      type: Object,
    },
  },
  computed: {
    ...mapState(useTransactionDetailsStore, ['contractId']),
    innerTransactionDetails() {
      return this.transactionData.tx.tx
    },
    transactionTypeTableComponent() {
      return defineAsyncComponent(() =>
        import(`@/components/TransactionTypeTable${this.transactionData.type}.vue`),
      )
    },
    typeName() {
      return this.transactionData.type
        .replace(/([A-Z]+)/g, ' $1').replace(/([A-Z][a-z])/g, ' $1')
        .toUpperCase()
    },
  },
  watch: {
    transactionData: {
      immediate: true,
      handler() {
        if (this.transactionData.ga_id) {
          this.fetchContractIdByAccountId(this.transactionData.ga_id)
        }
      },
    },
  },
  methods: {
    ...mapActions(useTransactionDetailsStore, ['fetchContractIdByAccountId']),
    formatEllipseHash,
  },
}
</script>

<style scoped>
.transaction-type-panel {
  padding: var(--space-4) var(--space-1) var(--space-3);

  @media (--desktop) {
    padding: var(--space-4) var(--space-4) var(--space-2);
  }

  &__heading {
    margin-bottom: var(--space-2);
    @media (--desktop) {
      margin-bottom: 0;
    }
  }

  &__header {
    @media (--desktop) {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
  }

  &__container {
    display: flex;
    flex-wrap: wrap;
    max-width: 100%;
    gap: var(--space-1);
    margin-bottom: var(--space-1);

    &:empty {
      gap: 0;
      margin-bottom: 0;
    }
  }

  &__payer {
    word-wrap: anywhere;
    max-width: 100%;
  }
}
</style>
