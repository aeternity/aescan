<template>
  <app-panel class="transaction-general-panel">
    <header class="transaction-general-panel__header">
      <h2 class="transaction-general-panel__heading h3">
        GENERAL DETAILS
      </h2>
      <div class="transaction-general-panel__container">
        <copy-chip
          :label="transactionDetails.hash"
          class="transaction-general-panel__hash"/>
        <copy-chip
          :label="formatEllipseHash(transactionDetails.hash)"
          :clipboard-text="transactionDetails.hash"
          class="transaction-general-panel__hash-ellipse"/>
        <app-chip variant="primary">
          {{ transactionDetails.type }}
        </app-chip>
      </div>
    </header>
    <table>
      <tbody>
        <tr class="transaction-general-panel__row">
          <th class="transaction-general-panel__table-header">
            Block height
          </th>
          <td class="transaction-general-panel__data">
            {{ transactionDetails.blockHeight }}
          </td>
        </tr>
        <tr class="transaction-general-panel__row">
          <th class="transaction-general-panel__table-header">
            Block confirmations
          </th>
          <td class="transaction-general-panel__data">
            {{ transactionDetails.confirmations }}
          </td>
        </tr>
        <tr class="transaction-general-panel__row">
          <th class="transaction-general-panel__table-header">
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
            Microblock hash
          </th>
          <td class="transaction-general-panel__data">
            <span class="transaction-general-panel__hash">{{
              transactionDetails.blockHash
            }}</span>
            <span class="transaction-general-panel__hash-ellipse">{{
              formatEllipseHash(transactionDetails.blockHash)
            }}</span>
          </td>
        </tr>
        <tr
          v-if="transactionDetails.created"
          class="transaction-general-panel__row">
          <th class="transaction-general-panel__table-header">
            Time
          </th>
          <td class="transaction-general-panel__data">
            <datetime-label :datetime="transactionDetails.created"/>
          </td>
        </tr>
        <tr class="transaction-general-panel__row">
          <th class="transaction-general-panel__table-header">
            Fee
          </th>
          <td class="transaction-general-panel__data">
            {{ formatAePrice(formatAettosToAe(transactionDetails.fee), null) }}
          </td>
        </tr>
        <tr class="transaction-general-panel__row">
          <th class="transaction-general-panel__table-header">
            Nonce
          </th>
          <td class="transaction-general-panel__data">
            {{ transactionDetails.nonce }}
          </td>
        </tr>
        <tr class="transaction-general-panel__row">
          <th class="transaction-general-panel__table-header">
            API links
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
  padding: var(--space-4) var(--space-1) var(--space-2);

  @media (--desktop) {
    padding: var(--space-4) var(--space-4) var(--space-2);
  }

  &__heading {
    margin-bottom: var(--space-3);
    @media (--desktop) {
      margin-bottom: 0;
    }
  }

  &__header {
    @media (--desktop) {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
  }

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
    border-bottom: 1px solid var(--color-midnight-15);
  }

  &__data {
    text-align: right;
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

  &__hash {
    display: none;
    @media (--desktop) {
      display: inline-flex;
    }
  }

  &__hash-ellipse {
    @media (--desktop) {
      display: none;
    }
  }
}
</style>
