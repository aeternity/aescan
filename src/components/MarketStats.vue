<template>
  <div class="market-stats">
    <h2 class="market-stats__heading">
      Current {{ selectedNetwork }} Stats
    </h2>
    <ul class="market-stats__list">
      <li
        v-if="isMainnet"
        class="market-stats__item">
        <div class="market-stats__label">
          Price:
        </div>
        <div class="market-stats__value">
          $ {{ formatNullable(price) }}
          <trend-chip
            :delta="priceChange"
            class="market-stats__chip"/>
        </div>
      </li>
      <li
        v-if="isMainnet"
        class="market-stats__item">
        <div class="market-stats__label">
          Marketcap:
        </div>
        <div class="market-stats__value">
          $ {{ formatNullable(formatNumber(marketCap)) }}
        </div>
      </li>
      <li class="market-stats__item">
        <div class="market-stats__label">
          Distribution:
        </div>
        <div class="market-stats__value">
          <div class="market-stats__container">
            <price-label
              :has-icon="false"
              :price="distribution"/>
            /
            <price-label
              :has-icon="false"
              :price="MAX_AE_DISTRIBUTION"/>
            ({{ formatNullable(distributionPercentage) }}%)
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useRuntimeConfig } from 'nuxt/app'
import { MAX_AE_DISTRIBUTION } from '@/utils/constants'

const { NETWORK_NAME } = useRuntimeConfig().public

const selectedNetwork = `${NETWORK_NAME
  .charAt(0)
  .toUpperCase()}${NETWORK_NAME.slice(1).toLowerCase()}`

const isMainnet = NETWORK_NAME.toLowerCase() === 'mainnet'

const {
  price,
  priceChange,
  marketCap,
  distribution,
  distributionPercentage,
} = storeToRefs(useMarketStatsStore())
</script>

<style scoped>
.market-stats {
  &__heading {
    color: var(--color-white);
    margin-bottom: var(--space-3);
    display: none;

    @media (--desktop) {
      display: block;
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    color: var(--color-white);
    font-size: 16px;
    line-height: 20px;
    font-weight: 500;

    @media (--desktop) {
      gap: var(--space-3);
      flex-direction: row;
      justify-content: space-between;
      font-size: 20px;
      line-height: 25px;
      margin: 0;
    }
  }

  &__item {
    @media (--desktop) {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }

  &__value {
    display: flex;
    font-weight: 400;
    flex-direction: column;

    @media (--desktop) {
      align-items: center;
      flex-direction: row;
    }
  }

  &__label {
    margin-right: var(--space-0);
  }

  &__chip {
    margin: var(--space-1) auto 0 0;

    @media (--desktop) {
      margin: 0 0 0 var(--space-1);
    }
  }

  &__container {
    gap: 8px;
  }
}
</style>
