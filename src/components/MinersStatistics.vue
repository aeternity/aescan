<template>
  <!--  todo fix order-->
  <!--  todo rename component domain, miners vs mining-->
  <div class="mining-statistics">
    <app-panel class="mining-statistics__panel--miners">
      <h2 class="h5">
        MINERS
        <hint-tooltip>
          {{ miningHints.mining }}
        </hint-tooltip>
      </h2>
      <span class="mining-statistics__value">
        {{ statistics.minersCount }}
      </span>
    </app-panel>

    <app-panel class="mining-statistics__panel--peers">
      <h2 class="h5">
        PEERS
        <hint-tooltip>
          {{ miningHints.mining }}
        </hint-tooltip>
      </h2>
      <span class="mining-statistics__value">
        {{ statistics.peerCount }}
      </span>
    </app-panel>

    <app-panel class="mining-statistics__panel--pools">
      <h2 class="h5">
        POOLS
        <hint-tooltip>
          {{ miningHints.mining }}
        </hint-tooltip>
      </h2>
      <span class="mining-statistics__value">
        {{ MINERS.length }}
        <!--        todo wut-->
      </span>
    </app-panel>

    <app-panel class="mining-statistics__panel--reward">
      <h2 class="h5">
        REWARD
        <hint-tooltip>
          {{ miningHints.mining }}
        </hint-tooltip>
      </h2>
      <span class="mining-statistics__value">
        <price-label
          :price="statistics.blockReward"
          :max-digits="2"/>
      </span>
    </app-panel>

    <app-panel class="mining-statistics__panel--difficulty">
      <h2 class="h5">
        DIFFICULTY
        <hint-tooltip>
          {{ miningHints.mining }}
        </hint-tooltip>
      </h2>
      <span class="mining-statistics__value">
        {{ statistics.difficulty }}
      </span>
      <span class="mining-statistics__unit">
        KG/s
      </span>
    </app-panel>

    <app-panel class="mining-statistics__panel--hashrate">
      <h2 class="h5">
        HASHRATE
        <hint-tooltip>
          {{ miningHints.mining }}
        </hint-tooltip>
      </h2>
      <span class="mining-statistics__value">
        {{ statistics.hashrate }}
      </span>
      <span class="mining-statistics__unit">
        KG/s
      </span>
    </app-panel>

    <app-panel class="mining-statistics__panel--blocks-mined">
      <h2 class="h5">
        BLOCKS MINED
        <hint-tooltip>
          {{ miningHints.mining }}
        </hint-tooltip>
      </h2>
      <span class="mining-statistics__value">
        {{ statistics.topBlockHeight }}
      </span>
    </app-panel>

    <app-panel class="mining-statistics__panel--block-time">
      <h2 class="h5">
        BLOCK TIME
        <hint-tooltip>
          {{ miningHints.mining }}
        </hint-tooltip>
      </h2>
      <span class="mining-statistics__value">
        {{ statistics.blocksPerMinute }}
      </span>

      <span class="mining-statistics__unit">
        min/block
      </span>
    </app-panel>

    <app-panel class="mining-statistics__panel--max-tps">
      <h2 class="h5">
        MAX TPS
        <hint-tooltip>
          {{ miningHints.mining }}
        </hint-tooltip>
      </h2>
      <span class="mining-statistics__value">
        {{ statistics.maxTPS }}
      </span>

      <span class="mining-statistics__unit">
        tx/s
      </span>
    </app-panel>

    <!--    todo rename classes-->
    <!--    todo accommodate styles-->
    <app-panel
      class="mining-statistics__panel--chart"
      style="">
      <h2 class="h5">
        MINING POOLS IN LAST 24 HOURS
        <hint-tooltip>
          {{ miningHints.mining }}
        </hint-tooltip>
      </h2>

      <!--      todo rename component-->
      <pie-chart :top-miners="statistics.topMiners"/>
    </app-panel>
  </div>
</template>
<script setup>
import { miningHints } from '@/utils/hints/miningHints'

const { fetchMiningStatistics } = useMiningStore()
const { statistics } = storeToRefs(useMiningStore())

if (process.client) {
  await fetchMiningStatistics()
}
</script>

<style scoped>

/*todo how about testnet minig miners count*/
.mining-statistics {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(10, auto);
  grid-column-gap: 16px;
  grid-row-gap: 16px;
  height: auto;
  width: 100%;
  /*todo remove sizing*/

  @media (--desktop) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
    height: 414px;
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

    &--reward {
      grid-area: 4 / 1 / 5 / 2;

      @media (--desktop) {
        grid-area: 3 / 3 / 4 / 4;
      }
    }

    &--difficulty {
      grid-area: 5 / 1 / 6 / 2;

      @media (--desktop) {
        grid-area: 2 / 1 / 3 / 2;
      }
    }

    &--hashrate {
      grid-area: 6 / 1 / 7 / 2;

      @media (--desktop) {
        grid-area: 2 / 2 / 3 / 3;
      }
    }

    &--blocks-mined {
      grid-area: 7 / 1 / 8 / 2;

      @media (--desktop) {
        grid-area: 2 / 3 / 3 / 4;
      }
    }

    &--block-time {
      grid-area: 8 / 1 / 9 / 2;

      @media (--desktop) {
        grid-area: 3 / 1 / 4 / 2;
      }
    }

    &--max-tps {
      grid-area: 9 / 1 / 10 / 2;
      @media (--desktop) {
        grid-area: 3 / 2 / 4 / 3;
      }
    }

    &--chart {
      min-width: 0;
      /* chart resizing fix*/

      grid-area: 10 / 1 / 11 / 2;
      @media (--desktop) {
        grid-area: 1 / 4 / 4 / 5;
      }
    }
  }

}
</style>
