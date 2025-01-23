<template>
  <value-hash-ellipsed
    :hash="transactionData.senderId"
    :link-to="`/accounts/${transactionData.senderId}`"/>

  <transaction-arrow-right-icon/>
  <app-link
    v-if="hasRecipientName"
    :to="`/names/${transactionData.recipient.name}`"
    class="transaction-cell-spend-tx__chain-name u-ellipsis">
    {{ transactionData.recipient.name }}
  </app-link>
  <value-hash-ellipsed
    v-else
    :hash="transactionData.recipientId"
    :link-to="`/accounts/${transactionData.recipientId}`"/>

  <price-label :price="formatAettosToAe(transactionData.amount)"/>
</template>

<script setup>
const props = defineProps({
  transactionData: {
    required: true,
    type: Object,
  },
})

const hasRecipientName = computed(() => !!props.transactionData.recipient)
</script>

<style scoped>
.transaction-cell-spend-tx {
  &__chain-name {
    display: inline-block;
    max-width: 160px;
  }
}
</style>
