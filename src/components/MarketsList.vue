<template>
  <ul class="markets-list">
    <li class="markets-list__item">
      <app-link to="https://www.gate.io/price/aeternity-ae">
        Gate.io
      </app-link>
    </li>

    <li class="markets-list__item">
      <app-link to="https://www.mexc.com/price/AE">
        Mexc
      </app-link>
    </li>

    <li class="markets-list__item">
      <app-link to="https://www.coinstore.com/spot/AEUSDT">
        Coinstore
      </app-link>
    </li>

    <li class="markets-list__item">
      <app-link to="https://www.hotcoin.com/trade/ae_usdt">
        Hotcoin
      </app-link>
    </li>

    <li class="markets-list__item">
      <app-link to="https://www.coinw.com/frontweb/en_US/spot/AEUSDT">
        CoinW
      </app-link>
    </li>
  </ul>
</template>

<style scoped>
.markets-list {
  &__list {
    list-style: none;
    margin-left: 0;
  }

  &__item {
    margin: var(--space-2) var(--space-1);
  }
}
</style>
