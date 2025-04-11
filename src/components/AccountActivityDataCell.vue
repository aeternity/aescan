<template>
  <transaction-cell
    v-if="!isActivityCell"
    :transaction-type="activity.payload.tx.type"
    :transaction-data="activity.payload.tx"/>
  <div
    v-else
    class="account-activity-data-cell">
    <Suspense>
      <component
        :is="dataCellComponent"
        :activity="activity"
        :account-details="accountDetails"/>
      <template #fallback>
        Loading...
      </template>
    </Suspense>
  </div>
</template>

<script setup>
const props = defineProps({
  accountDetails: {
    type: Object,
    required: true,
  },
  activity: {
    type: Object,
    required: true,
  },
})

const isActivityCell = computed(() => {
  if (props.activity.type === 'SpendTxEvent' ||
    props.activity.type === 'ContractCallTxEvent' ||
    props.activity.type === 'ContractCreateTxEvent' ||
    props.activity.type === 'NameClaimTxEvent' ||
    props.activity.type === 'NameUpdateTxEvent' ||
    props.activity.type === 'NameRevokeTxEvent' ||
    props.activity.type === 'NamePreclaimTxEvent' ||
    props.activity.type === 'InternalContractCallEvent' ||
    props.activity.type === 'InternalTransferEvent' ||
    props.activity.type === 'Aex9TransferEvent' ||
    props.activity.type === 'Aex141TransferEvent') {
    return true
  } else {
    return false
  }
})

const dataCellComponent = computed(() =>
  defineAsyncComponent(async () => {
      try {
        return await import(`@/components/AccountActivityDataCell${props.activity.type}.vue`)
      } catch {
        console.error(`Unknown account activity data cell ${props.activity.type}`)
        return defineComponent(() => () => h('span', 'N/A'))
      }
    },
  ),
)
</script>

<style scoped>
.account-activity-data-cell {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: var(--space-1);
  flex-wrap: nowrap;

  @media (--desktop) {
    justify-content: space-between;
  }
}
</style>
