<template>
  <app-panel class="account-details-panel">
    <template v-if="accountDetails.isExistent === false">
      <div class="u-hidden-mobile">
        <copy-chip :label="accountDetails.id"/>
      </div>
      <div class="u-hidden-desktop">
        <copy-chip
          :label="formatEllipseHash(accountDetails.id)"
          :clipboard-text="accountDetails.id"/>
      </div>

      <p class="account-details-panel__not-existent">
        The account has never been seen in the network.
        <br>
        Details will be displayed once the account is directly involved in a native transaction, but the account can
        already receive custom tokens.
      </p>
    </template>
    <table v-else>
      <tbody>
        <tr class="account-details-panel__row">
          <th class="account-details-panel__table-header">
            <hint-tooltip>
              {{ accountHints.address }}
            </hint-tooltip>
            Address
          </th>
          <td>
            <div class="u-hidden-mobile">
              <copy-chip :label="accountDetails.id"/>
            </div>
            <div class="u-hidden-desktop">
              <copy-chip
                :label="formatEllipseHash(accountDetails.id)"
                :clipboard-text="accountDetails.id"/>
            </div>
          </td>
        </tr>
        <tr class="account-details-panel__row">
          <th class="account-details-panel__table-header">
            <hint-tooltip>
              {{ accountHints.balance }}
            </hint-tooltip>
            Balance
          </th>
          <td>
            <price-label :price="accountDetails.balance"/>
          </td>
        </tr>

        <tr class="account-details-panel__row">
          <th class="account-details-panel__table-header">
            <hint-tooltip>
              {{ accountHints.value }}
            </hint-tooltip>
            Value
          </th>
          <td>
            {{ sanitizedPrice }}
          </td>
        </tr>
        <tr class="account-details-panel__row">
          <th class="account-details-panel__table-header">
            <hint-tooltip>
              {{ accountHints.transactions }}
            </hint-tooltip>
            Transactions
          </th>
          <td>
            {{ formatNumber(accountDetails.totalTransactionsCount) }}
          </td>
        </tr>
        <tr
          v-if="accountDetails.isGeneralized"
          class="account-details-panel__row">
          <th class="account-details-panel__table-header">
            <hint-tooltip>
              {{ accountHints.generalized }}
            </hint-tooltip>
            Is Generalized
          </th>
          <td>
            <app-chip size="sm">
              Generalized
            </app-chip>
          </td>
        </tr>
        <tr
          v-if="accountDetails.isGeneralized"
          class="account-details-panel__row">
          <th class="account-details-panel__table-header">
            <hint-tooltip>
              {{ accountHints.contractId }}
            </hint-tooltip>
            Contract Id
          </th>
          <td>
            <app-link :to="`/contracts/${accountDetails.contractId}`">
              {{ accountDetails.contractId }}
            </app-link>
          </td>
        </tr>
        <tr
          v-else
          class="account-details-panel__row">
          <th class="account-details-panel__table-header">
            <hint-tooltip>
              {{ accountHints.nonce }}
            </hint-tooltip>
            Nonce
          </th>
          <td>
            {{ accountDetails.nonce }}
          </td>
        </tr>
        <tr class="account-details-panel__row">
          <th class="account-details-panel__table-header">
            <hint-tooltip>
              {{ accountHints.apiLinks }}
            </hint-tooltip>
            API Links
          </th>
          <td>
            <app-link
              :to="accountNodeUrl"
              class="account-details-panel__link">
              <app-icon
                name="file-cloud"
                :size="22"/>
              Node
            </app-link>
          </td>
        </tr>
      </tbody>
    </table>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { accountHints } from '@/utils/hints/accountHints'
import { formatNumber } from '@/utils/format'
import { useMarketStatsStore } from '@/stores/marketStats'

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
    : 'N/A',
)
</script>

<style scoped>
.account-details-panel {
  &__table-header {
    border-bottom: 1px solid var(--color-midnight-25);

    @media (--desktop) {
      width: var(--detail-column-width);
    }
  }

  &__row:last-of-type &__table-header {
    border-bottom: 0;
  }

  &__link {
    display: inline-flex;
    align-items: center;
  }

  &__not-existent {
    margin: var(--space-3) 0;
  }
}
</style>
