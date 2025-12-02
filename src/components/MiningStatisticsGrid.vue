<template>
  <div class="mining-statistics-grid">
    <app-panel class="mining-statistics-grid__panel--miners">
      <h2 class="h5">
        MINERS
        <hint-tooltip>
          {{ miningHints.miners }}
        </hint-tooltip>
      </h2>
      <span class="mining-statistics-grid__value">
        {{ statistics.minersCount }}
      </span>
    </app-panel>

    <app-panel class="mining-statistics-grid__panel--peers">
      <h2 class="h5">
        PEERS
        <hint-tooltip>
          {{ miningHints.peers }}
        </hint-tooltip>
      </h2>
      <span class="mining-statistics-grid__value">
        {{ statistics.peerCount }}
      </span>
    </app-panel>

    <app-panel class="mining-statistics-grid__panel--pools">
      <h2 class="h5">
        POOLS
        <hint-tooltip>
          {{ miningHints.pools }}
        </hint-tooltip>
      </h2>
      <span class="mining-statistics-grid__value">
        <template v-if="NETWORK_NAME !== 'TESTNET'">
          {{ MINING_POOLS.length }}
        </template>
        <not-available-label v-else/>
      </span>
    </app-panel>
    <app-panel class="mining-statistics-grid__panel--reward">
      <h2 class="h5">
        REWARD
        <hint-tooltip>
          {{ miningHints.reward }}
        </hint-tooltip>
      </h2>
      <span class="mining-statistics-grid__value">
        <price-label
          :price="statistics.blockReward"
          :max-digits="2"/>
      </span>
    </app-panel>

    <app-panel class="mining-statistics-grid__panel--difficulty">
      <h2 class="h5">
        DIFFICULTY
        <hint-tooltip>
          {{ miningHints.difficulty }}
        </hint-tooltip>
      </h2>
      <span class="mining-statistics-grid__value">
        {{ statistics.difficulty }}
      </span>
      <span class="mining-statistics-grid__unit">
        KG/s
      </span>
    </app-panel>

    <app-panel class="mining-statistics-grid__panel--hashrate-trend">
      <h2 class="h5">
        HASHRATE TREND
        <hint-tooltip>
          {{ miningHints.hashrateTrend }}
        </hint-tooltip>
      </h2>
      <line-chart
        :height="190"
        :data="statistics.hashrateStatistics"
        interval-by="month"/>
    </app-panel>

    <app-panel class="mining-statistics-grid__panel--hashrate">
      <h2 class="h5">
        HASHRATE
        <hint-tooltip>
          {{ miningHints.hashrate }}
        </hint-tooltip>
      </h2>
      <span class="mining-statistics-grid__value">
        {{ statistics.hashrate }}
      </span>
      <span class="mining-statistics-grid__unit">
        KG/s
      </span>
    </app-panel>

    <app-panel class="mining-statistics-grid__panel--blocks-mined">
      <h2 class="h5">
        BLOCKS MINED
        <hint-tooltip>
          {{ miningHints.blocksMined }}
        </hint-tooltip>
      </h2>
      <span class="mining-statistics-grid__value">
        {{ statistics.topBlockHeight }}
      </span>
    </app-panel>

    <app-panel class="mining-statistics-grid__panel--block-time">
      <h2 class="h5">
        BLOCK TIME
        <hint-tooltip>
          {{ miningHints.blockTime }}
        </hint-tooltip>
      </h2>
      <span class="mining-statistics-grid__value">
        {{ statistics.blocksPerMinute }}
      </span>

      <span class="mining-statistics-grid__unit">
        min/block
      </span>
    </app-panel>

    <app-panel class="mining-statistics-grid__panel--max-tps">
      <h2 class="h5">
        MAX TPS
        <hint-tooltip>
          {{ miningHints.maxTPS }}
        </hint-tooltip>
      </h2>
      <span class="mining-statistics-grid__value">
        {{ statistics.maxTPS }}
      </span>

      <span class="mining-statistics-grid__unit">
        tx/s
      </span>
    </app-panel>

    <app-panel class="mining-statistics-grid__panel--top-miners">
      <h2 class="h5">
        TOP MINERS IN LAST 24 HOURS
        <hint-tooltip>
          {{ miningHints.miningPoolsChart }}
        </hint-tooltip>
      </h2>

      <doughnut-chart :top-miners="statistics.topMiners"/>
    </app-panel>
  </div>
</template>

<script setup>
import { miningHints } from '@/utils/hints/miningHints'

const { NETWORK_NAME } = useRuntimeConfig().public

const { fetchMiningStatistics } = useMiningStore()
const { statistics } = storeToRefs(useMiningStore())

if (import.meta.client) {
  await fetchMiningStatistics()
}
</script>

<style scoped>
.mining-statistics-grid {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(10, auto);
  column-gap: 16px;
  row-gap: 16px;
  margin-bottom: var(--space-4);

  @media (--desktop) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
  }

  &__value {
    display: inline-flex;
    justify-content: space-between;
    font-size: 36px;
    font-family: var(--font-monospaced);
    font-weight: 400;
    margin-top: var(--space-3);
  }

  &__unit {
    white-space: nowrap;
  }

  &__panel {
    &--miners {
      grid-area: 1 / 1 / 2 / 2;

      @media (--desktop) {
        grid-area: 1 / 1 / 2 / 2;
      }
    }

    &--peers {
      grid-area: 2 / 1 / 3 / 2;

      @media (--desktop) {
        grid-area: 1 / 2 / 2 / 3;
      }
    }

    &--pools {
      grid-area: 3 / 1 / 4 / 2;

      @media (--desktop) {
        grid-area: 1 / 3 / 2 / 4;
      }
    }

    &--difficulty {
      grid-area: 4 / 1 / 5 / 2;

      @media (--desktop) {
        grid-area: 3 / 1 / 4 / 2;
      }
    }

    &--hashrate {
      grid-area: 5 / 1 / 6 / 2;

      @media (--desktop) {
        grid-area: 2 / 1 / 3 / 2;
      }
    }

    &--hashrate-trend {
      min-width: 0;
      /* chart resizing fix*/

      grid-area: 6 / 1 / 7 / 2;

      @media (--desktop) {
        grid-area: 2 / 2 / 4 / 4;
      }
    }

    &--blocks-mined {
      grid-area: 7 / 1 / 8 / 2;

      @media (--desktop) {
        grid-area: 4 / 2 / 5 / 3;
      }
    }

    &--block-time {
      grid-area: 8 / 1 / 9 / 2;

      @media (--desktop) {
        grid-area: 4 / 4 / 5 / 5;
      }
    }

    &--max-tps {
      grid-area: 9 / 1 / 10 / 2;

      @media (--desktop) {
        grid-area: 4 / 3 / 5 / 4;
      }
    }

    &--reward {
      grid-area: 10 / 1 / 11 / 2;

      @media (--desktop) {
        grid-area: 4 / 1 / 5 / 2;
      }
    }

    &--top-miners {
      min-width: 0;
      /* chart resizing fix*/

      grid-area: 11 / 1 / 12 / 2;

      @media (--desktop) {
        grid-area: 1 / 4 / 4 / 5;
      }
    }
  }
}
</style>
