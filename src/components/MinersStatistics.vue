<template>
  <div class="mining-statistics parent">
    <app-panel class="mining-statistics__panel div1">
      <h5>
        MINERS
        <!--        todo h3-->
        <hint-tooltip>
          {{ miningHints.mining }}
        </hint-tooltip>
      </h5>
      <span class="mining-statistics__value">
        {{ minersCount }}
      </span>
    </app-panel>

    <app-panel class="mining-statistics__panel div2">
      <h5>
        PEERS
        <hint-tooltip>
          {{ miningHints.mining }}
        </hint-tooltip>
      </h5>
      <span class="mining-statistics__value">
        {{ status.peerCount }}
      </span>
    </app-panel>

    <app-panel class="mining-statistics__panel div3">
      <h5>
        POOLS
        <hint-tooltip>
          {{ miningHints.mining }}
        </hint-tooltip>
      </h5>
      <span class="mining-statistics__value">
        {{ MINERS.length }}
      </span>
    </app-panel>

    <app-panel class="mining-statistics__panel div9">
      <h5>
        REWARD
        <hint-tooltip>
          {{ miningHints.mining }}
        </hint-tooltip>
      </h5>
      <span class="mining-statistics__value">
        <price-label
          :price="formatAettosToAe(blockReward)"
          :max-digits="2"/>
      </span>
    </app-panel>

    <app-panel class="mining-statistics__panel div5">
      <h5>
        DIFFICULTY
        <hint-tooltip>
          {{ miningHints.mining }}
        </hint-tooltip>
      </h5>
      <span class="mining-statistics__value">
        {{ Math.round(status.difficulty / 1000000000) }}
      </span>
      <span class="mining-statistics__unit">
        KG/s
      </span>
    </app-panel>

    <app-panel class="mining-statistics__panel div6">
      <h5>
        HASHRATE
        <hint-tooltip>
          {{ miningHints.mining }}
        </hint-tooltip>
      </h5>
      <span class="mining-statistics__value">
        {{ Math.round(status.hashrate / 1000) }}
      </span>
      <span class="mining-statistics__unit">
        KG/s
      </span>
    </app-panel>

    <app-panel class="mining-statistics__panel div7">
      <h5>
        BLOCKS MINED
        <hint-tooltip>
          {{ miningHints.mining }}
        </hint-tooltip>
      </h5>
      <span class="mining-statistics__value">
        {{ formatNumber(status.topBlockHeight) }}
      </span>
    </app-panel>

    <app-panel class="mining-statistics__panel div8">
      <h5>
        BLOCK TIME
        <hint-tooltip>
          {{ miningHints.mining }}
        </hint-tooltip>
      </h5>
      <span class="mining-statistics__value">
        {{ Math.round(blocksPerMinute) }}
      </span>

      <span class="mining-statistics__unit">
        min/block
      </span>
    </app-panel>

    <app-panel class="mining-statistics__panel div4">
      <h5>
        MAX TPS
        <hint-tooltip>
          {{ miningHints.mining }}
        </hint-tooltip>
      </h5>
      <span class="mining-statistics__value">
        {{ maxTPS }}
      </span>

      <span class="mining-statistics__unit">
        tx/s
      </span>
    </app-panel>

    <app-panel class="mining-statistics__panel div10">
      <h5>
        TOP MINERS IN LAST 24 HOURS
        <hint-tooltip>
          {{ miningHints.mining }}
        </hint-tooltip>
      </h5>
      <pie-chart/>
      <!--      todo chart abstraction-->
      <!--      todo add legend-->
    </app-panel>
  </div>
</template>
<script setup>
import { miningHints } from '../utils/hints/miningHints'
import { useMinersStore } from '@/stores/miners'
import { formatAettosToAe } from '@/utils/format'

const { fetchMining } = useMinersStore()
const {
  minersCount,
  blockReward,
  status,
  blocksPerMinute,
  maxTPS,
  miners,
} = storeToRefs(useMinersStore())

if (process.client) {
  await fetchMining()
}
</script>

<style scoped>
.parent {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  height: 500px;
  width: 100%;
}

.div1 {
  grid-area: 1 / 1 / 2 / 2;
}

.div2 {
  grid-area: 1 / 2 / 2 / 3;
}

.div3 {
  grid-area: 1 / 3 / 2 / 4;
}

.div4 {
  grid-area: 3 / 3 / 4 / 4;
}

.div5 {
  grid-area: 2 / 1 / 3 / 2;
}

.div6 {
  grid-area: 2 / 2 / 3 / 3;
}

.div7 {
  grid-area: 2 / 3 / 3 / 4;
}

.div8 {
  grid-area: 3 / 1 / 4 / 2;
}

.div9 {
  grid-area: 3 / 2 / 4 / 3;
}

.div10 {
  grid-area: 1 / 4 / 4 / 5;
}

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
