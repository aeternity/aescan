<template>
  <app-panel class="ae-coin-panel">
    <table>
      <tbody>
        <tr class="ae-coin-panel__row">
          <th class="ae-coin-panel__table-header">
            <hint-tooltip>
              {{ aeCoinHints.tokenSymbol }}
            </hint-tooltip>
            Symbol
          </th>
          <td class="ae-coin-panel__data">
            <div class="ae-coin-panel__link">
              <img
                class="ae-coin-panel__icon"
                alt="æ token"
                src="@/assets/ae-logo.svg">
              <copy-chip label="AE"/>
            </div>
          </td>
        </tr>
        <tr class="ae-coin-panel__row">
          <th class="ae-coin-panel__table-header">
            <hint-tooltip>
              {{ aeCoinHints.price }}
            </hint-tooltip>
            Price
          </th>
          <td class="ae-coin-panel__data">
            $ {{ formatNullable(price) }}
            <trend-chip :delta="priceChange"/>
          </td>
        </tr>
        <tr class="ae-coin-panel__row">
          <th class="ae-coin-panel__table-header">
            <hint-tooltip>
              {{ aeCoinHints.totalSupply }}
            </hint-tooltip>
            Total Supply
          </th>
          <td class="ae-coin-panel__data">
            <price-label :price="MAX_AE_DISTRIBUTION"/>
          </td>
        </tr>
        <tr class="ae-coin-panel__row">
          <th class="ae-coin-panel__table-header">
            <hint-tooltip>
              {{ aeCoinHints.circulating }}
            </hint-tooltip>
            Circulating Supply
          </th>
          <td class="ae-coin-panel__data">
            <price-label :price="totalTokenSupply"/>
          </td>
        </tr>
        <tr class="ae-coin-panel__row">
          <th class="ae-coin-panel__table-header">
            <hint-tooltip>
              {{ aeCoinHints.decimals }}
            </hint-tooltip>
            Decimals
          </th>
          <td class="ae-coin-panel__data">
            18
          </td>
        </tr>
      </tbody>
    </table>
  </app-panel>
</template>

<script setup>
import { aeCoinHints } from '@/utils/hints/aeCoinHints'
import { MAX_AE_DISTRIBUTION } from '@/utils/constants'

defineProps({
  price: {
    type: Number,
    required: true,
  },
  priceChange: {
    type: Number,
    required: true,
  },
  totalTokenSupply: {
    type: Number,
    required: true,
  },
})

</script>

<style scoped>
.ae-coin-panel {
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
    padding-left: 28px;

    @media (--mobile) {
      display: table-cell;
    }
  }

  &__link {
    display: inline-flex;
    align-items: center;
  }

  &__icon {
    margin-right: var(--space-1);
    width: 28px;
    height: 28px;

  }
}
</style>
