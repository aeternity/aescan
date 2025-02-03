<template>
  <app-panel class="transaction-general-panel">
    <table>
      <tbody>
        <tr class="transaction-general-panel__row">
          <th class="transaction-general-panel__table-header">
            <hint-tooltip>
              {{ transactionsHints.hash }}
            </hint-tooltip>
            Transaction ID
          </th>
          <td class="transaction-general-panel__data">
            <div class="u-hidden-mobile">
              <copy-chip :label="transactionDetails.hash"/>
            </div>
            <div class="u-hidden-desktop">
              <copy-chip
                :label="formatEllipseHash(transactionDetails.hash)"
                :clipboard-text="transactionDetails.hash"/>
            </div>
          </td>
        </tr>
        <tr class="transaction-general-panel__row">
          <th class="transaction-general-panel__table-header">
            <hint-tooltip>
              {{ transactionsHints.type }}
            </hint-tooltip>
            Transaction Type
          </th>
          <td class="transaction-general-panel__data">
            {{ transactionDetails.type }}
          </td>
        </tr>
        <tr class="transaction-general-panel__row">
          <th class="transaction-general-panel__table-header">
            <hint-tooltip>
              {{ transactionsHints.keyblockHeight }}
            </hint-tooltip>
            Keyblock Height
          </th>
          <td class="transaction-general-panel__data">
            <app-link
              :to="`/keyblocks/${transactionDetails.blockHeight}`">
              {{ transactionDetails.blockHeight }}
            </app-link>
          </td>
        </tr>
        <tr class="transaction-general-panel__row">
          <th class="transaction-general-panel__table-header">
            <hint-tooltip>
              {{ transactionsHints.keyblockConfirmations }}
            </hint-tooltip>
            Keyblock Confirmations
          </th>
          <td class="transaction-general-panel__data">
            {{ transactionDetails.confirmations }}
          </td>
        </tr>
        <tr class="transaction-general-panel__row">
          <th class="transaction-general-panel__table-header">
            <hint-tooltip>
              {{ transactionsHints.status }}
            </hint-tooltip>
            Status
          </th>
          <td class="transaction-general-panel__data">
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
        <tr
          v-if="transactionDetails.blockHash"
          class="transaction-general-panel__row">
          <th class="transaction-general-panel__table-header">
            <hint-tooltip>
              {{ transactionsHints.microblockHash }}
            </hint-tooltip>
            Microblock Hash
          </th>
          <td class="transaction-general-panel__data">
            <app-link
              :to="`/microblocks/${transactionDetails.blockHash}`"
              class="u-hidden-mobile">
              {{ transactionDetails.blockHash }}
            </app-link>
            <app-link
              :to="`/microblocks/${transactionDetails.blockHash}`"
              class="u-hidden-desktop">
              {{ formatEllipseHash(transactionDetails.blockHash) }}
            </app-link>
          </td>
        </tr>
        <tr
          v-if="transactionDetails.created"
          class="transaction-general-panel__row">
          <th class="transaction-general-panel__table-header">
            <hint-tooltip>
              {{ transactionsHints.createdTime }}
            </hint-tooltip>
            Created
          </th>
          <td class="transaction-general-panel__data">
            <timestamp-label
              :timestamp="transactionDetails.created"
              :is-extended="true"/>
          </td>
        </tr>
        <tr class="transaction-general-panel__row">
          <th class="transaction-general-panel__table-header">
            <hint-tooltip>
              {{ transactionsHints.fee }}
            </hint-tooltip>
            Fee
          </th>
          <td class="transaction-general-panel__data">
            <price-label :price="formatAettosToAe(transactionDetails.fee)"/>
          </td>
        </tr>
        <tr class="transaction-general-panel__row">
          <th class="transaction-general-panel__table-header">
            <hint-tooltip>
              {{ transactionsHints.nonce }}
            </hint-tooltip>
            Nonce
          </th>
          <td class="transaction-general-panel__data">
            {{ transactionDetails.nonce }}
          </td>
        </tr>
        <tr class="transaction-general-panel__row">
          <th class="transaction-general-panel__table-header">
            <hint-tooltip>
              {{ transactionsHints.apiLinks }}
            </hint-tooltip>
            API Links
          </th>
          <td class="transaction-general-panel__data">
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

const props = defineProps({
  transactionDetails: {
    type: Object,
    required: true,
  },
})

const transactionNodeUrl = computed(() => {
  return `${NODE_URL}/v3/transactions/${props.transactionDetails.hash}`
})

const transactionMiddlewareUrl = computed(() => {
  return `${MIDDLEWARE_URL}/v3/transactions/${props.transactionDetails.hash}`
})
</script>

<style scoped>
.transaction-general-panel {
  &__table-header {
    display: block;
    padding-bottom: 0;

    @media (--mobile) {
      padding-bottom: 8px;
      width: var(--detail-column-width);
      border-bottom: 1px solid var(--color-midnight-25);
      display: table-cell;
    }
  }

  &__row {
    display: block;

    @media (--mobile) {
      display: table-row;
    }
  }

  &__row:last-of-type &__table-header {
    border-bottom: 0;
  }

  &__data {
    display: block;
    padding-left: 20px;

    @media (--mobile) {
      display: table-cell;
    }
  }

  &__link {
    display: inline-flex;
    align-items: center;

    &:first-child {
      margin-right: var(--space-3);
    }
  }
}
</style>
