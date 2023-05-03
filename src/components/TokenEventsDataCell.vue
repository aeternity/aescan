<template>
  <div class="token-events-data-cell">
    <template v-if="name === 'Mint'">
      <value-hash-ellipsed
        :hash="args[0]"
        :link-to="`/accounts/${args[0]}`"/>
      <app-chip class="token-events-data-cell__chip">
        {{ args[1] }}
      </app-chip>
      {{ data }}
    </template>

    <template v-else-if="name === 'Burn'">
      <value-hash-ellipsed
        :hash="args[0]"
        :link-to="`/accounts/${args[0]}`"/>
      <app-chip class="token-events-data-cell__chip">
        {{ args[1] }}
      </app-chip>
      {{ data }}
    </template>

    <template v-else-if="name === 'Transfer'">
      <value-hash-ellipsed
        :hash="args[0]"
        :link-to="`/accounts/${args[0]}`"/>
      <transaction-arrow-right-icon class="token-events-data-cell__transaction-arrow-right-icon"/>
      <value-hash-ellipsed
        :hash="args[1]"
        :link-to="`/accounts/${args[1]}`"/>
      <span class="token-events-data-cell__price">
        {{ formatNumber(args[2] / 10 ** tokenDetails.decimals, 0, 4) }}
        {{ tokenDetails.symbol }}
      </span>
    </template>

    <template v-else-if="name === 'Allowance'">
      <value-hash-ellipsed
        :hash="args[0]"
        :link-to="`/accounts/${args[0]}`"/>
      <transaction-arrow-right-icon class="token-events-data-cell__transaction-arrow-right-icon"/>
      <app-chip class="token-events-data-cell__chip">
        {{ args[1] }}
      </app-chip>
      {{ args[2] }}
      {{ data }}
    </template>
    <template v-else>
      N/A
    </template>
  </div>
</template>

<script setup>
import { useTokenDetailsStore } from '~/stores/tokenDetails'

const { tokenDetails } = useTokenDetailsStore()

defineProps({
  name: {
    type: String,
    required: true,
  },
  data: {
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
  display: inline-flex;
  align-items: center;

  &__transaction-arrow-right-icon {
    margin: 0 var(--space-1);
  }

  &__chip {
    margin-left: var(--space-1);
  }

  &__price {
    margin-left: var(--space-1);
  }
}

</style>
