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
        <div>
          <copy-chip
            class="transaction-type-panel__chip--paying"
            :label="transactionData.payerId"/>

          <app-chip
            variant="primary"
            size="sm">
            {{ transactionData.tx.tx.type }}
          </app-chip>
        </div>
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

const { fetchContractIdByAccountId } = useTransactionDetailsStore()
const { contractId } = storeToRefs(useTransactionDetailsStore())

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

  &__payer {
    word-wrap: anywhere;
    max-width: 100%;
  }

  &__chip--paying {
    margin-bottom: var(--space-2);

    @media (--mobile) {
      margin-right: var(--space-2);
    }
  }
}
</style>
