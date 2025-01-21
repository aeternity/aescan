<template>
  <app-panel class="transaction-type-panel">
    <template #title>
      {{ typeName }} DETAILS
    </template>
    <template #end>
      <app-link
        v-if="transactionData.type === 'SpendTx' && transactionData.recipient?.account"
        :to="`/names/${transactionData.recipient.name}`">
        <app-chip>
          {{ transactionData.recipient.name }}
        </app-chip>
      </app-link>
      <template v-if="transactionData.type === 'PayingForTx'">
        <copy-chip
          :label="transactionData.payerId"
          class="u-hidden-mobile"/>
        <copy-chip
          :label="formatEllipseHash(transactionData.payerId)"
          :clipboard-text="transactionData.payerId"
          class="u-hidden-desktop"/>
        <app-chip
          variant="primary"
          size="sm">
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
    </template>

    <component
      :is="transactionTypeTableComponent"
      :transaction-data="transactionData"/>
  </app-panel>
</template>

<script setup>

const transactionDetailsStore = useTransactionDetailsStore()
const { fetchContractIdByAccountId } = transactionDetailsStore
const { contractId } = storeToRefs(transactionDetailsStore)

const props = defineProps({
  transactionData: {
    required: true,
    type: Object,
  },
})

const innerTransactionDetails = computed(() =>
  props.transactionData.tx.tx,
)

const transactionTypeTableComponent = computed(() =>
  defineAsyncComponent(() =>
    import(`@/components/TransactionTypeTable${props.transactionData.type}.vue`),
  ),
)

const typeName = computed(() =>
  props.transactionData.type
    .replace(/([A-Z]+)/g, ' $1').replace(/([A-Z][a-z])/g, ' $1')
    .toUpperCase(),
)

watch(props.transactionData, () => {
  if (props.transactionData.ga_id) {
    fetchContractIdByAccountId(props.transactionData.ga_id)
  }
},
{ immediate: true })
</script>

<style scoped>
.transaction-type-panel {
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
