<template>
  <app-panel class="ae-coin-panel">
    <table>
      <tbody>
        <tr>
          <th>
            <hint-tooltip>
              {{ aeCoinHints.tokenSymbol }}
            </hint-tooltip>
            Symbol
          </th>
          <td>
            <div class="ae-coin-panel__link">
              <img
                class="ae-coin-panel__icon"
                alt="æ token"
                src="@/assets/ae-logo.svg">
              <copy-chip label="AE"/>
            </div>
          </td>
        </tr>
        <tr>
          <th>
            <hint-tooltip>
              {{ aeCoinHints.price }}
            </hint-tooltip>
            Price
          </th>
          <td>
            $ {{ formatNullable(price) }}
            <trend-chip :delta="priceChange"/>
          </td>
        </tr>
        <tr>
          <th>
            <hint-tooltip>
              {{ aeCoinHints.totalSupply }}
            </hint-tooltip>
            Total Supply
          </th>
          <td>
            <price-label :price="MAX_AE_DISTRIBUTION"/>
          </td>
        </tr>
        <tr>
          <th>
            <hint-tooltip>
              {{ aeCoinHints.circulating }}
            </hint-tooltip>
            Circulating Supply
          </th>
          <td>
            <price-label :price="totalTokenSupply"/>
          </td>
        </tr>
        <tr>
          <th>
            <hint-tooltip>
              {{ aeCoinHints.decimals }}
            </hint-tooltip>
            Decimals
          </th>
          <td>
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
@import url("../assets/styles/utilities/_detail-table.css");

.ae-coin-panel {
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
