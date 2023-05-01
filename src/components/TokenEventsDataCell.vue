<template>
  <div>
    <div v-if="name === 'Mint'">
      <value-hash-ellipsed
        :hash="args[0]"
        :link-to="`/account/${args[0]}`"/>
      <app-chip class="token-events-data-cell__chip">
        {{ args[1] }}
      </app-chip>
      {{ data }}
    </div>

    <div v-else-if="name === 'Burn'">
      <value-hash-ellipsed
        :hash="args[0]"
        :link-to="`/account/${args[0]}`"/>
      <app-chip class="token-events-data-cell__chip">
        {{ args[1] }}
      </app-chip>
      {{ data }}
    </div>

    <div v-else-if="name === 'Transfer'">
      <value-hash-ellipsed
        :hash="args[0]"
        :link-to="`/account/${args[0]}`"/>
      <transaction-arrow-right-icon class="token-events-data-cell__transaction-arrow-right-icon"/>
      <value-hash-ellipsed
        :hash="args[1]"
        :link-to="`/account/${args[1]}`"/>
      {{ formatNumber(args[2], 0, tokenDetails.decimals) }} {{ tokenDetails.symbol }}
    </div>

    <div v-else-if="name === 'Allowance'">
      <value-hash-ellipsed
        :hash="args[0]"
        :link-to="`/account/${args[0]}`"/>
      <transaction-arrow-right-icon class="token-events-data-cell__transaction-arrow-right-icon"/>
      <app-chip class="token-events-data-cell__chip">
        {{ args[1] }}
      </app-chip>
      {{ args[2] }}
      {{ data }}
    </div>
    <div v-else>
      N/A
    </div>
  </div>
</template>

<script setup>
import { useTokenDetailsStore } from '~/stores/tokenDetails'
import { formatNumber } from '~/utils/format'

const { tokenDetails } = useTokenDetailsStore()

defineProps({
  name: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
  args: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.token-events-data-cell {
  &__transaction-arrow-right-icon {
    margin: 0 var(--space-1);
  }

  &__chip {
    margin-left: var(--space-1);
  }
}

</style>
