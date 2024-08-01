<template>
  <div class="token-events-data-cell">
    <template v-if="name === 'Mint'">
      <value-hash-ellipsed
        :hash="args[0]"
        :link-to="`/accounts/${args[0]}`"/>
      <price-label
        :price="args[1] / 10 ** tokenDetails.decimals"
        :max-digits="4"
        :currency="tokenDetails.symbol"
        :contract-id="tokenDetails.contractId"/>
    </template>

    <template v-else-if="name === 'Burn'">
      <value-hash-ellipsed
        :hash="args[0]"
        :link-to="`/accounts/${args[0]}`"/>
      <price-label
        :price="args[1] / 10 ** tokenDetails.decimals"
        :max-digits="4"
        :currency="tokenDetails.symbol"
        :contract-id="tokenDetails.contractId"/>
    </template>

    <template v-else-if="name === 'Transfer'">
      <value-hash-ellipsed
        :hash="args[0]"
        :link-to="`/accounts/${args[0]}`"/>
      <transaction-arrow-right-icon class="token-events-data-cell__transaction-arrow-right-icon"/>
      <value-hash-ellipsed
        :hash="args[1]"
        :link-to="`/accounts/${args[1]}`"/>
      <price-label
        :price="args[2] / 10 ** tokenDetails.decimals"
        :max-digits="4"
        :currency="tokenDetails.symbol"
        :contract-id="tokenDetails.contractId"/>
    </template>

    <template v-else-if="name === 'Allowance'">
      <value-hash-ellipsed
        :hash="args[0]"
        :link-to="`/accounts/${args[0]}`"/>
      <transaction-arrow-right-icon class="token-events-data-cell__transaction-arrow-right-icon"/>
      <value-hash-ellipsed
        :hash="args[1]"
        :link-to="`/accounts/${args[1]}`"/>
      <price-label
        :price="args[2] / 10 ** tokenDetails.decimals"
        :max-digits="4"
        :currency="tokenDetails.symbol"
        :contract-id="tokenDetails.contractId"/>
    </template>
    <template v-else>
      N/A
    </template>
  </div>
</template>

<script setup>
import { useTokenDetailsStore } from '@/stores/tokenDetails'

const { tokenDetails } = useTokenDetailsStore()

defineProps({
  name: {
    type: String,
    required: true,
  },
  args: {
    type: Array,
    required: true,
  },
})
</script>

<style scoped>
.token-events-data-cell {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--space-1);
  flex-wrap: wrap;

  @media (--desktop) {
    justify-content: space-between;
  }
}

</style>
