<template>
  <div>
    <table class="ae-coin-markets-table-condensed__table">
      <tbody>
        <tr class="ae-coin-markets-table-condensed__row">
          <th class="ae-coin-markets-table-condensed__header">
            <app-tooltip>
              Name
              <template #tooltip>
                {{ aeCoinHints.marketName }}
              </template>
            </app-tooltip>
          </th>
          <td class="ae-coin-markets-table-condensed__data">
            Gate.io
          </td>
        </tr>
        <tr class="ae-coin-markets-table-condensed__row">
          <th class="ae-coin-markets-table-condensed__header">
            Token Pair
            <hint-tooltip>
              {{ aeCoinHints.pair }}
            </hint-tooltip>
          </th>
          <td class="ae-coin-markets-table-condensed__data">
            AE / USDT
          </td>
        </tr>
        <tr class="ae-coin-markets-table-condensed__row">
          <th class="ae-coin-markets-table-condensed__header">
            Price
            <hint-tooltip>
              {{ aeCoinHints.marketPrice }}
            </hint-tooltip>
          </th>
          <td class="ae-coin-markets-table-condensed__data">
            $ {{ formatNullable(formatNumber(gate?.price)) }}
          </td>
        </tr>
        <tr class="ae-coin-markets-table-condensed__row">
          <th class="ae-coin-markets-table-condensed__header">
            Volume (24h)
            <hint-tooltip>
              {{ aeCoinHints.volume }}
            </hint-tooltip>
          </th>
          <td class="ae-coin-markets-table-condensed__data">
            $ {{ formatNullable(formatNumber(gate?.volume)) }}
          </td>
        </tr>
      </tbody>
    </table>
    <table class="ae-coin-markets-table-condensed__table">
      <tbody>
        <tr class="ae-coin-markets-table-condensed__row">
          <th class="ae-coin-markets-table-condensed__header">
            <app-tooltip>
              Name
              <template #tooltip>
                {{ aeCoinHints.marketName }}
              </template>
            </app-tooltip>
          </th>
          <td class="ae-coin-markets-table-condensed__data">
            Mexc
          </td>
        </tr>
        <tr class="ae-coin-markets-table-condensed__row">
          <th class="ae-coin-markets-table-condensed__header">
            Token Pair
            <hint-tooltip>
              {{ aeCoinHints.pair }}
            </hint-tooltip>
          </th>
          <td class="ae-coin-markets-table-condensed__data">
            AE / USDT
          </td>
        </tr>
        <tr class="ae-coin-markets-table-condensed__row">
          <th class="ae-coin-markets-table-condensed__header">
            Price
            <hint-tooltip>
              {{ aeCoinHints.marketPrice }}
            </hint-tooltip>
          </th>
          <td class="ae-coin-markets-table-condensed__data">
            $ {{ formatNullable(formatNumber(mexc?.price)) }}
          </td>
        </tr>
        <tr class="ae-coin-markets-table-condensed__row">
          <th class="ae-coin-markets-table-condensed__header">
            Volume (24h)
            <hint-tooltip>
              {{ aeCoinHints.volume }}
            </hint-tooltip>
          </th>
          <td class="ae-coin-markets-table-condensed__data">
            $ {{ formatNullable(formatNumber(mexc?.volume)) }}
          </td>
        </tr>
      </tbody>
    </table>
    <table class="ae-coin-markets-table-condensed__table">
      <tbody>
        <tr class="ae-coin-markets-table-condensed__row">
          <th class="ae-coin-markets-table-condensed__header">
            <app-tooltip>
              Name
              <template #tooltip>
                {{ aeCoinHints.marketName }}
              </template>
            </app-tooltip>
          </th>
          <td class="ae-coin-markets-table-condensed__data">
            HotCoin
          </td>
        </tr>
        <tr class="ae-coin-markets-table-condensed__row">
          <th class="ae-coin-markets-table-condensed__header">
            Token Pair
            <hint-tooltip>
              {{ aeCoinHints.pair }}
            </hint-tooltip>
          </th>
          <td class="ae-coin-markets-table-condensed__data">
            AE / USDT
          </td>
        </tr>
        <tr class="ae-coin-markets-table-condensed__row">
          <th class="ae-coin-markets-table-condensed__header">
            Price
            <hint-tooltip>
              {{ aeCoinHints.marketPrice }}
            </hint-tooltip>
          </th>
          <td class="ae-coin-markets-table-condensed__data">
            $ {{ formatNullable(formatNumber(hotCoin?.price)) }}
          </td>
        </tr>
        <tr class="ae-coin-markets-table-condensed__row">
          <th class="ae-coin-markets-table-condensed__header">
            Volume (24h)
            <hint-tooltip>
              {{ aeCoinHints.volume }}
            </hint-tooltip>
          </th>
          <td class="ae-coin-markets-table-condensed__data">
            $ {{ formatNullable(formatNumber(hotCoin?.volume)) }}
          </td>
        </tr>
      </tbody>
    </table>
    <table class="ae-coin-markets-table-condensed__table">
      <tbody>
        <tr class="ae-coin-markets-table-condensed__row">
          <th class="ae-coin-markets-table-condensed__header">
            <app-tooltip>
              Name
              <template #tooltip>
                {{ aeCoinHints.marketName }}
              </template>
            </app-tooltip>
          </th>
          <td class="ae-coin-markets-table-condensed__data">
            CoinStore
          </td>
        </tr>
        <tr class="ae-coin-markets-table-condensed__row">
          <th class="ae-coin-markets-table-condensed__header">
            Token Pair
            <hint-tooltip>
              {{ aeCoinHints.pair }}
            </hint-tooltip>
          </th>
          <td class="ae-coin-markets-table-condensed__data">
            AE / USDT
          </td>
        </tr>
        <tr class="ae-coin-markets-table-condensed__row">
          <th class="ae-coin-markets-table-condensed__header">
            Price
            <hint-tooltip>
              {{ aeCoinHints.marketPrice }}
            </hint-tooltip>
          </th>
          <td class="ae-coin-markets-table-condensed__data">
            $ {{ formatNullable(formatNumber(coinStore?.price)) }}
          </td>
        </tr>
        <tr class="ae-coin-markets-table-condensed__row">
          <th class="ae-coin-markets-table-condensed__header">
            Volume (24h)
            <hint-tooltip>
              {{ aeCoinHints.volume }}
            </hint-tooltip>
          </th>
          <td class="ae-coin-markets-table-condensed__data">
            $ {{ formatNullable(formatNumber(coinStore?.volume)) }}
          </td>
        </tr>
      </tbody>
    </table>
    <table class="ae-coin-markets-table-condensed__table">
      <tbody>
        <tr class="ae-coin-markets-table-condensed__row">
          <th class="ae-coin-markets-table-condensed__header">
            <app-tooltip>
              Name
              <template #tooltip>
                {{ aeCoinHints.marketName }}
              </template>
            </app-tooltip>
          </th>
          <td class="ae-coin-markets-table-condensed__data">
            CoinW
          </td>
        </tr>
        <tr class="ae-coin-markets-table-condensed__row">
          <th class="ae-coin-markets-table-condensed__header">
            Token Pair
            <hint-tooltip>
              {{ aeCoinHints.pair }}
            </hint-tooltip>
          </th>
          <td class="ae-coin-markets-table-condensed__data">
            AE / USDT
          </td>
        </tr>
        <tr class="ae-coin-markets-table-condensed__row">
          <th class="ae-coin-markets-table-condensed__header">
            Price
            <hint-tooltip>
              {{ aeCoinHints.marketPrice }}
            </hint-tooltip>
          </th>
          <td class="ae-coin-markets-table-condensed__data">
            $ {{ formatNullable(formatNumber(coinStore?.coinW)) }}
          </td>
        </tr>
        <tr class="ae-coin-markets-table-condensed__row">
          <th class="ae-coin-markets-table-condensed__header">
            Volume (24h)
            <hint-tooltip>
              {{ aeCoinHints.volume }}
            </hint-tooltip>
          </th>
          <td class="ae-coin-markets-table-condensed__data">
            $ {{ formatNullable(formatNumber(coinStore?.coinW)) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>

defineProps({
  gate: {
    type: Object,
    required: true,
  },
  mexc: {
    type: Object,
    required: true,
  },
  hotCoin: {
    type: Object,
    required: true,
  },
  coinStore: {
    type: Object,
    required: true,
  },
  coinW: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.ae-coin-markets-table-condensed {
  &__table {
    padding: 0 var(--space-1) var(--space-7);
    margin-bottom: var(--space-5);
  }

  &__header {
    border-bottom: 1px solid var(--color-midnight-25);
    padding-right: var(--space-4);
  }

  &__row:last-of-type &__header {
    border-bottom: 0;
  }

  &__data {
    text-align: right;
  }
}
</style>
