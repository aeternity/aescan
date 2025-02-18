<template>
  <div class="mining-statistics">
    <app-panel class="mining-statistics__panel div1">
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

    <app-panel class="mining-statistics__panel div2">
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

    <app-panel class="mining-statistics__panel div3">
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

    <app-panel class="mining-statistics__panel div9">
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

    <app-panel class="mining-statistics__panel div5">
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

    <app-panel class="mining-statistics__panel div6">
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

    <app-panel class="mining-statistics__panel div7">
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

    <app-panel class="mining-statistics__panel div8">
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

    <app-panel class="mining-statistics__panel div4">
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

    <app-panel class="mining-statistics__panel div10">
      <h2 class="h5">
        MINING POOLS IN LAST 24 HOURS
        <hint-tooltip>
          {{ miningHints.mining }}
        </hint-tooltip>
      </h2>

      <pie-chart :top-miners="topMiners"/>
      <!--      todo chart abstraction-->
      <!--      todo add legend-->
    </app-panel>
  </div>
</template>
<script setup>
import { miningHints } from '@/utils/hints/miningHints'

const { fetchMining, fetchTopMiners } = useMiningStore()
const { statistics, topMiners } = storeToRefs(useMiningStore())

if (process.client) {
  await fetchMining()
  await fetchTopMiners()
  // todo glue together
}
</script>

<style scoped>

/*todo how about testnet miners count*/
.mining-statistics {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(10, auto);
  grid-column-gap: 16px;
  grid-row-gap: 16px;
  height: auto;
  width: 100%;

  @media (--desktop) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
    height: 414px;
  }

  .div1 {
    grid-area: 1 / 1 / 2 / 2;

    @media (--desktop) {
      grid-area: 1 / 1 / 2 / 2;
    }
  }

  .div2 {
    grid-area: 2 / 1 / 3 / 2;

    @media (--desktop) {
      grid-area: 1 / 2 / 2 / 3;
    }
  }

  .div3 {
    grid-area: 3 / 1 / 4 / 2;

    @media (--desktop) {
      grid-area: 1 / 3 / 2 / 4;
    }
  }

  .div4 {
    grid-area: 4 / 1 / 5 / 2;

    @media (--desktop) {
      grid-area: 3 / 3 / 4 / 4;
    }
  }

  .div5 {
    grid-area: 5 / 1 / 6 / 2;

    @media (--desktop) {
      grid-area: 2 / 1 / 3 / 2;
    }
  }

  .div6 {
    grid-area: 6 / 1 / 7 / 2;

    @media (--desktop) {
      grid-area: 2 / 2 / 3 / 3;
    }
  }

  .div7 {
    grid-area: 7 / 1 / 8 / 2;

    @media (--desktop) {
      grid-area: 2 / 3 / 3 / 4;
    }
  }

  .div8 {
    grid-area: 8 / 1 / 9 / 2;

    @media (--desktop) {
      grid-area: 3 / 1 / 4 / 2;
    }
  }

  .div9 {
    grid-area: 9 / 1 / 10 / 2;

    @media (--desktop) {
      grid-area: 3 / 2 / 4 / 3;
    }
  }

  .div10 {
    grid-area: 10 / 1 / 11 / 2;

    @media (--desktop) {
      grid-area: 1 / 4 / 4 / 5;
    }
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
}

</style>
