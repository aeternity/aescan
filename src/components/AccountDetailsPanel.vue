<template>
  <app-panel class="account-details-panel">
    <header class="account-details-panel__header">
      <h2 class="account-details-panel__heading h3">
        DETAILS
      </h2>
      <div>
        <app-chip
          v-if="accountDetails.isGeneralized"
          class="account-details-panel__chip">
          Generalized
        </app-chip>

        <copy-chip
          :label="accountDetails.id"
          class="account-details-panel__copy-chip"/>
        <copy-chip
          :label="formatEllipseHash(accountDetails.id)"
          :clipboard-text="accountDetails.id"
          class="account-details-panel__copy-chip-ellipse"/>
      </div>
    </header>
    <p
      v-if="accountDetails.notExistent"
      class="account-details-panel__not-existent">
      The account has never been seen in the network.
      <br>
      Details will be displayed after the first interaction with this account.
    </p>
    <table v-else>
      <tbody>
        <tr class="account-details-panel__row">
          <th class="account-details-panel__table-header">
            Balance
          </th>
          <td class="account-details-panel__data">
            {{ formatAePrice(accountDetails.balance, null) }}
          </td>
        </tr>
        <tr class="account-details-panel__row">
          <th class="account-details-panel__table-header">
            Value
          </th>
          <td class="account-details-panel__data">
            {{ sanitizedPrice }}
          </td>
        </tr>
        <tr class="account-details-panel__row">
          <th class="account-details-panel__table-header">
            Transactions
          </th>
          <td class="account-details-panel__data">
            {{ formatNumber(accountDetails.totalTransactionsCount) }}
          </td>
        </tr>
        <tr class="account-details-panel__row">
          <th class="account-details-panel__table-header">
            AENS Names
          </th>
          <td class="account-details-panel__data">
            {{ formatNumber(accountDetails.namesCount) }}
          </td>
        </tr>
        <tr class="account-details-panel__row">
          <th class="account-details-panel__table-header">
            Nonce
          </th>
          <td class="account-details-panel__data">
            {{ accountDetails.nonce }}
          </td>
        </tr>
        <tr class="account-details-panel__row">
          <th class="account-details-panel__table-header">
            API links
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

<script>
import { mapState } from 'pinia'
import AppPanel from '@/components/AppPanel'
import CopyChip from '@/components/CopyChip'
import AppIcon from '@/components/AppIcon'
import AppLink from '@/components/AppLink'
import { formatAePrice, formatEllipseHash, formatNullable, formatNumber } from '@/utils/format'
import { useMarketStatsStore } from '@/stores/marketStats'

export default {
  components: {
    AppPanel,
    CopyChip,
    AppIcon,
    AppLink,
  },
  props: {
    accountDetails: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState(useMarketStatsStore, ['price']),
    accountNodeUrl() {
      return `${this.$config.public.NODE_URL}/v3/accounts/${this.accountDetails.id}`
    },
    sanitizedPrice() {
      return this.price
        ? `$${formatNullable(formatNumber(this.accountDetails.balance * this.price, 0, 2))}`
        : '---'
    },
  },
  methods: {
    formatNumber,
    formatNullable,
    formatAePrice,
    formatEllipseHash,
  },
}
</script>

<style scoped>
.account-details-panel {
  padding: var(--space-4) var(--space-1) var(--space-3);
  margin-bottom: var(--space-7);

  @media (--desktop) {
    padding: var(--space-4) var(--space-4) var(--space-2);
    margin-bottom: var(--space-6);
  }

  &__header {
    margin-bottom: var(--space-2);
    @media (--desktop) {
      margin-bottom: 0;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
  }

  &__heading {
    margin-bottom: var(--space-3);
    @media (--desktop) {
      margin-bottom: 0;
    }
  }

  &__chip {
    margin-right: var(--space-1);
  }

  &__copy-chip {
    display: none;

    @media (--desktop) {
      display: inline-flex;
    }
  }

  &__copy-chip-ellipse {
    @media (--desktop) {
      display: none;
    }
  }

  &__table-header {
    border-bottom: 1px solid var(--color-midnight-15);
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
    font-weight: 400;
    display: inline-flex;
    align-items: center;
  }

  &__not-existent {
    margin: var(--space-3) 0;
  }
}
</style>
