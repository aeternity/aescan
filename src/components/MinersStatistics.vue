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
        {{ minersCount }}
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
        {{ status.peerCount }}
      </span>
    </app-panel>
    <!--todo layout wider-->
    <app-panel class="mining-statistics__panel div3">
      <h2 class="h5">
        POOLS
        <hint-tooltip>
          {{ miningHints.mining }}
        </hint-tooltip>
      </h2>
      <span class="mining-statistics__value">
        {{ MINERS.length }}
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
          :price="formatAettosToAe(blockReward)"
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
        {{ Math.round(status.difficulty / 1000000000) }}
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
        {{ Math.round(status.hashrate / 1000) }}
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
        {{ formatNumber(status.topBlockHeight) }}
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
        {{ Math.round(blocksPerMinute) }}
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
        {{ maxTPS }}
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
import { useMinersStore } from '@/composables/miners'
import { formatAettosToAe } from '@/utils/format'

const { fetchMining, fetchTopMiners } = useMinersStore()
const {
  minersCount,
  blockReward,
  status,
  blocksPerMinute,
  maxTPS,
  topMiners,
} = storeToRefs(useMinersStore())

if (process.client) {
  await fetchMining()
  await fetchTopMiners()
}
</script>

<style scoped>

/*todo how about testnet*/
/*todo fix selectors*/
.mining-statistics {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-column-gap: 16px;
  grid-row-gap: 16px;
  height: 414px;
  width: 100%;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(10, auto);
    height: auto;
  }

  .div1 {
    grid-area: 1 / 1 / 2 / 2;

    @media screen and (max-width: 768px) {
      grid-area: 1 / 1 / 2 / 2;
    }
  }

  .div2 {
    grid-area: 1 / 2 / 2 / 3;

    @media screen and (max-width: 768px) {
      grid-area: 2 / 1 / 3 / 2;
    }
  }

  .div3 {
    grid-area: 1 / 3 / 2 / 4;

    @media screen and (max-width: 768px) {
      grid-area: 3 / 1 / 4 / 2;
    }
  }

  .div4 {
    grid-area: 3 / 3 / 4 / 4;

    @media screen and (max-width: 768px) {
      grid-area: 4 / 1 / 5 / 2;
    }
  }

  .div5 {
    grid-area: 2 / 1 / 3 / 2;

    @media screen and (max-width: 768px) {
      grid-area: 5 / 1 / 6 / 2;
    }
  }

  .div6 {
    grid-area: 2 / 2 / 3 / 3;

    @media screen and (max-width: 768px) {
      grid-area: 6 / 1 / 7 / 2;
    }
  }

  .div7 {
    grid-area: 2 / 3 / 3 / 4;

    @media screen and (max-width: 768px) {
      grid-area: 7 / 1 / 8 / 2;
    }
  }

  .div8 {
    grid-area: 3 / 1 / 4 / 2;

    @media screen and (max-width: 768px) {
      grid-area: 8 / 1 / 9 / 2;
    }
  }

  .div9 {
    grid-area: 3 / 2 / 4 / 3;

    @media screen and (max-width: 768px) {
      grid-area: 9 / 1 / 10 / 2;
    }
  }

  .div10 {
    grid-area: 1 / 4 / 4 / 5;

    @media screen and (max-width: 768px) {
      grid-area: 10 / 1 / 11 / 2;
    }
  }
}

/*.parent {*/
/*  display: grid;*/
/*  grid-template-columns: repeat(4, 1fr);*/
/*  grid-template-rows: repeat(4, 1fr);*/
/*  grid-column-gap: 16px;*/
/*  grid-row-gap: 16px;*/
/*  height: 414px;*/
/*  width: 100%;*/
/*}*/

/*.div1 {*/
/*  grid-area: 1 / 1 / 2 / 2;*/
/*}*/

/*.div2 {*/
/*  grid-area: 1 / 2 / 2 / 3;*/
/*}*/

/*.div3 {*/
/*  grid-area: 1 / 3 / 2 / 4;*/
/*}*/

/*.div4 {*/
/*  grid-area: 3 / 3 / 4 / 4;*/
/*}*/

/*.div5 {*/
/*  grid-area: 2 / 1 / 3 / 2;*/
/*}*/

/*.div6 {*/
/*  grid-area: 2 / 2 / 3 / 3;*/
/*}*/

/*.div7 {*/
/*  grid-area: 2 / 3 / 3 / 4;*/
/*}*/

/*.div8 {*/
/*  grid-area: 3 / 1 / 4 / 2;*/
/*}*/

/*.div9 {*/
/*  grid-area: 3 / 2 / 4 / 3;*/
/*}*/

/*.div10 {*/
/*  grid-area: 1 / 4 / 4 / 5;*/
/*}*/

/*@media screen and (max-width: 768px) {*/
/*  .parent {*/
/*    grid-template-columns: 1fr;*/
/*    grid-template-rows: repeat(10, auto);*/
/*    height: auto;*/
/*  }*/

/*  .div1 {*/
/*    grid-area: 1 / 1 / 2 / 2;*/
/*  }*/

/*  .div2 {*/
/*    grid-area: 2 / 1 / 3 / 2;*/
/*  }*/

/*  .div3 {*/
/*    grid-area: 3 / 1 / 4 / 2;*/
/*  }*/

/*  .div4 {*/
/*    grid-area: 4 / 1 / 5 / 2;*/
/*  }*/

/*  .div5 {*/
/*    grid-area: 5 / 1 / 6 / 2;*/
/*  }*/

/*  .div6 {*/
/*    grid-area: 6 / 1 / 7 / 2;*/
/*  }*/

/*  .div7 {*/
/*    grid-area: 7 / 1 / 8 / 2;*/
/*  }*/

/*  .div8 {*/
/*    grid-area: 8 / 1 / 9 / 2;*/
/*  }*/

/*  .div9 {*/
/*    grid-area: 9 / 1 / 10 / 2;*/
/*  }*/

/*  .div10 {*/
/*    grid-area: 10 / 1 / 11 / 2;*/
/*  }*/
/*}*/

.mining-statistics {
  /*display: flex;*/
  /*flex-direction: column;*/
  /*flex-wrap: wrap;*/
  /*gap: var(--space-2);*/
  /*width: 100%;*/
  /*margin-bottom: var(--space-2);*/

  /*@media (--desktop) {*/
  /*  flex-direction: row;*/
  /*}*/

  /*&__panel {*/
  /*  padding: var(--space-4);*/
  /*  width: 50%;*/

  /*  @media (--desktop) {*/
  /*    width: 18%;*/
  /*  }*/
  /*}*/

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
