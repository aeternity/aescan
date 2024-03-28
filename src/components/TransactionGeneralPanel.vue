<template>
  <app-panel class="transaction-general-panel">
    <template #header>
      <copy-chip
        :label="transactionDetails.hash"
        class="u-hidden-mobile"/>
      <copy-chip
        :label="formatEllipseHash(transactionDetails.hash)"
        :clipboard-text="transactionDetails.hash"
        class="u-hidden-desktop"/>
      <app-chip
        variant="primary"
        size="sm">
        {{ transactionDetails.type }}
      </app-chip>
    </template>

    <table>
      <tbody>
        <tr class="transaction-general-panel__row">
          <th class="transaction-general-panel__table-header">
            <hint-tooltip>
              {{ transactionsHints.keyblockHeight }}
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
              {{ transactionsHints.created }}
            </hint-tooltip>
            Created
          </th>
          <td class="transaction-general-panel__data">
            <datetime-label :datetime="transactionDetails.created"/>
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
            {{ formatAePrice(formatAettosToAe(transactionDetails.fee), null) }}
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
            <div class="transaction-general-panel__container">
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
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </app-panel>
</template>

<script setup>
import { transactionsHints } from '@/utils/hints/transactionsHints'
import AppPanel from '@/components/AppPanel'
import AppChip from '@/components/AppChip'
import AppIcon from '@/components/AppIcon'
import AppLink from '@/components/AppLink'
import CopyChip from '@/components/CopyChip'
import { formatAePrice, formatAettosToAe, formatEllipseHash } from '@/utils/format'
import DatetimeLabel from '@/components/DatetimeLabel'

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
  return `${MIDDLEWARE_URL}/v2/txs/${props.transactionDetails.hash}`
})
</script>

<style scoped>
.transaction-general-panel {
  &__container {
    display: inline-flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: var(--space-2) var(--space-1);
    margin-bottom: var(--space-1);

    @media (--desktop) {
      justify-content: flex-end;
      margin-bottom: 0;
    }
  }

  &__table-header {
    @media (--desktop) {
      width: 400px;
    }
    border-bottom: 1px solid var(--color-midnight-25);
  }

  &__data {
    text-align: left;
  }

  &__row:last-of-type &__table-header {
    border-bottom: 0;
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
