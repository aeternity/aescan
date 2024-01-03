<template>
  <app-panel class="account-details-panel">
    <template #heading>
      DETAILS
    </template>
    <template #header>
      <app-chip
        v-if="accountDetails.isGeneralized"
        size="sm">
        Generalized
      </app-chip>

      <copy-chip
        :label="accountDetails.id"
        class="u-hidden-mobile"/>
      <copy-chip
        :label="formatEllipseHash(accountDetails.id)"
        :clipboard-text="accountDetails.id"
        class="u-hidden-desktop"/>
    </template>
    <p
      v-if="accountDetails.isExistent === false"
      class="account-details-panel__not-existent">
      The account has never been seen in the network.
      <br>
      Details will be displayed once the account is directly involved in a native transaction, but the account can
      already receive custom tokens.
    </p>
    <table v-else>
      <tbody>
        <tr class="account-details-panel__row">
          <th class="account-details-panel__table-header">
            Balance
            <hint-tooltip>
              {{ accountHints.balance }}
            </hint-tooltip>
          </th>
          <td class="account-details-panel__data">
            <price-label :price="accountDetails.balance"/>
          </td>
        </tr>
        <tr class="account-details-panel__row">
          <th class="account-details-panel__table-header">
            Value
            <hint-tooltip>
              {{ accountHints.value }}
            </hint-tooltip>
          </th>
          <td class="account-details-panel__data">
            {{ sanitizedPrice }}
          </td>
        </tr>
        <tr class="account-details-panel__row">
          <th class="account-details-panel__table-header">
            Transactions
            <hint-tooltip>
              {{ accountHints.transactions }}
            </hint-tooltip>
          </th>
          <td class="account-details-panel__data">
            {{ formatNumber(accountDetails.totalTransactionsCount) }}
          </td>
        </tr>
        <tr
          v-if="accountDetails.isGeneralized"
          class="account-details-panel__row">
          <th class="account-details-panel__table-header">
            Contract Id
            <hint-tooltip>
              {{ accountHints.contractId }}
            </hint-tooltip>
          </th>
          <td class="account-details-panel__data">
            <app-link :to="`/contracts/${accountDetails.contractId}`">
              {{ accountDetails.contractId }}
            </app-link>
          </td>
        </tr>
        <tr
          v-else
          class="account-details-panel__row">
          <th class="account-details-panel__table-header">
            Nonce
            <hint-tooltip>
              {{ accountHints.nonce }}
            </hint-tooltip>
          </th>
          <td class="account-details-panel__data">
            {{ accountDetails.nonce }}
          </td>
        </tr>
        <tr class="account-details-panel__row">
          <th class="account-details-panel__table-header">
            API Links
            <hint-tooltip>
              {{ accountHints.apiLinks }}
            </hint-tooltip>
          </th>
          <td class="account-details-panel__data">
            <div class="account-details-panel__container">
              <app-link
                :to="accountNodeUrl"
                class="account-details-panel__link">
                <app-icon
                  name="file-cloud"
                  :size="22"/>
                Node
              </app-link>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { accountHints } from '@/utils/hints/accountHints'
import AppPanel from '@/components/AppPanel'
import CopyChip from '@/components/CopyChip'
import AppIcon from '@/components/AppIcon'
import AppLink from '@/components/AppLink'
import { formatNumber } from '@/utils/format'
import { useMarketStatsStore } from '@/stores/marketStats'
import HintTooltip from '@/components/HintTooltip'
import AppChip from '@/components/AppChip'
import PriceLabel from '~/components/PriceLabel'

const { price } = storeToRefs(useMarketStatsStore())
const { NODE_URL } = useRuntimeConfig().public

const props = defineProps({
  accountDetails: {
    type: Object,
    required: true,
  },
})

const accountNodeUrl = computed(() =>
  `${NODE_URL}/v3/accounts/${props.accountDetails.id}`,
)
const sanitizedPrice = computed(() =>
  price.value
    ? `$${formatNumber(props.accountDetails.balance * price.value, 2, 2)}`
    : '---',
)
</script>

<style scoped>
.account-details-panel {
  &__table-header {
    border-bottom: 1px solid var(--color-midnight-25);
  }

  &__row:last-of-type &__table-header {
    border-bottom: 0;
  }

  &__data {
    text-align: right;
  }

  &__container {
    display: flex;
    justify-content: flex-end;
  }

  &__link {
    display: inline-flex;
    align-items: center;
  }

  &__not-existent {
    margin: 0 0 var(--space-3) 0;
  }
}
</style>
