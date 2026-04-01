<template>
  <app-panel class="transaction-general-panel">
    <table>
      <tbody>
        <tr>
          <th>
            <hint-tooltip>
              {{ transactionsHints.hash }}
            </hint-tooltip>
            Transaction ID
          </th>
          <td>
            <div class="transaction-general-panel__id-controls">
              <pagination-button
                class="transaction-general-panel__button--prev"
                direction="left"
                :disabled="!adjacentTransactions?.prevHash"
                @click="adjacentTransactions?.prevHash
                  && $router.push(`/transactions/${adjacentTransactions.prevHash}`)"/>
              <copy-chip :label="transactionDetails.hash"/>
              <pagination-button
                class="transaction-general-panel__button--next"
                direction="right"
                :disabled="!adjacentTransactions?.nextHash"
                @click="adjacentTransactions?.nextHash
                  && $router.push(`/transactions/${adjacentTransactions.nextHash}`)"/>
            </div>
          </td>
        </tr>
        <tr>
          <th>
            <hint-tooltip>
              {{ transactionsHints.type }}
            </hint-tooltip>
            Transaction Type
          </th>
          <td>
            {{ transactionDetails.type }}
          </td>
        </tr>
        <tr>
          <th>
            <hint-tooltip>
              {{ transactionsHints.keyblockHeight }}
            </hint-tooltip>
            Keyblock Height
          </th>
          <td>
            <app-link
              :to="`/keyblocks/${transactionDetails.blockHeight}`">
              {{ transactionDetails.blockHeight }}
            </app-link>
          </td>
        </tr>
        <tr>
          <th>
            <hint-tooltip>
              {{ transactionsHints.keyblockConfirmations }}
            </hint-tooltip>
            Keyblock Confirmations
          </th>
          <td>
            {{ transactionDetails.confirmations }}
          </td>
        </tr>
        <tr>
          <th>
            <hint-tooltip>
              {{ transactionsHints.status }}
            </hint-tooltip>
            Status
          </th>
          <td>
            <app-chip
              v-if="transactionDetails.isMined"
              variant="success">
              Mined
            </app-chip>
            <app-chip
              v-else
              size="sm">
              Pending
            </app-chip>
          </td>
        </tr>
        <tr v-if="transactionDetails.blockHash">
          <th>
            <hint-tooltip>
              {{ transactionsHints.microblockHash }}
            </hint-tooltip>
            Microblock Hash
          </th>
          <td>
            <app-link :to="`/microblocks/${transactionDetails.blockHash}`">
              {{ transactionDetails.blockHash }}
            </app-link>
          </td>
        </tr>
        <tr v-if="transactionDetails.created">
          <th>
            <hint-tooltip>
              {{ transactionsHints.createdTime }}
            </hint-tooltip>
            Created
          </th>
          <td>
            <timestamp-label
              :timestamp="transactionDetails.created"
              :is-extended="true"/>
          </td>
        </tr>
        <tr>
          <th>
            <hint-tooltip>
              {{ transactionsHints.fee }}
            </hint-tooltip>
            Fee
          </th>
          <td>
            <price-label :price="formatAettosToAe(transactionDetails.fee)"/>
          </td>
        </tr>
        <tr>
          <th>
            <hint-tooltip>
              {{ transactionsHints.nonce }}
            </hint-tooltip>
            Nonce
          </th>
          <td>
            {{ transactionDetails.nonce }}
          </td>
        </tr>
        <tr>
          <th>
            <hint-tooltip>
              {{ transactionsHints.apiLinks }}
            </hint-tooltip>
            API Links
          </th>
          <td>
            <app-link
              :to="transactionNodeUrl"
              class="transaction-general-panel__link">
              <app-icon
                name="file-cloud"
                :size="22"/>
              Node
            </app-link>
            <app-link
              v-if="transactionDetails.isMined"
              :to="transactionMiddlewareUrl"
              class="transaction-general-panel__link">
              <app-icon
                name="file-cloud"
                :size="22"/>
              Middleware
            </app-link>
          </td>
        </tr>
      </tbody>
    </table>
  </app-panel>
</template>

<script setup>
import { transactionsHints } from '@/utils/hints/transactionsHints'

const { NODE_URL, MIDDLEWARE_URL } = useRuntimeConfig().public

const { adjacentTransactions } = storeToRefs(useTransactionDetailsStore())
const { fetchAdjacentTransactions } = useTransactionDetailsStore()

const props = defineProps({
  transactionDetails: {
    type: Object,
    required: true,
  },
})

const transactionNodeUrl = computed(() => {
  return `${NODE_URL}/transactions/${props.transactionDetails.hash}`
})

const transactionMiddlewareUrl = computed(() => {
  return `${MIDDLEWARE_URL}/transactions/${props.transactionDetails.hash}`
})

if (import.meta.client) {
  onMounted(() => {
    fetchAdjacentTransactions()
  })
}
</script>

<style scoped>
@import url("../assets/styles/utilities/_detail-table.css");

.transaction-general-panel {
  &__link {
    display: inline-flex;
    align-items: center;

    &:first-child {
      margin-right: var(--space-3);
    }
  }

  &__id-controls {
    display: flex;
    align-items: center;
  }

  &__button {
    &--prev {
      margin-right: var(--space-1);

      @media (--desktop) {
        margin-right: var(--space-3);
      }
    }

    &--next {
      margin-left: var(--space-1);

      @media (--desktop) {
        margin-left: var(--space-3);
      }
    }
  }
}
</style>
