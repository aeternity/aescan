<template>
  <!--  {{ status }}-->
  <span class="mining-statistics">
    <app-panel class="mining-statistics__panel">
      <h5>MINERS</h5>
      <span class="mining-statistics__value">
        {{ minersCount }}
      </span>
    </app-panel>

    <app-panel class="mining-statistics__panel">
      <h5>PEERS</h5>
      <span class="mining-statistics__value">
        {{ status.peerCount }}
      </span>
    </app-panel>

    <app-panel class="mining-statistics__panel">
      <h5>POOLS</h5>
      <span class="mining-statistics__value">
        {{ MINERS.length }}
      </span>
    </app-panel>

    <app-panel class="mining-statistics__panel">
      <h5>REWARD</h5>
      <span class="mining-statistics__value">
        <!--        <price-label
          :price="formatAettosToAe(blockReward)"
          :max-digits="2"
          :has-icon="false"/>-->
        <price-label :price="formatAettosToAe(blockReward, null)"/>
      </span>
    </app-panel>

    <app-panel class="mining-statistics__panel">
      <h5>DIFFICULTY</h5>
      <span class="mining-statistics__value">
        {{ Math.round(status.difficulty / 1000000000) }}
      </span>
      KG/s

    </app-panel>

    <app-panel class="mining-statistics__panel">
      <h5>HASHRATE</h5>
      <span class="mining-statistics__value">
        {{ Math.round(status.hashrate / 1000) }}
      </span>
      KG/s

    </app-panel>

    <app-panel class="mining-statistics__panel">
      <h5>BLOCKS MINED</h5>
      <span class="mining-statistics__value">
        {{ formatNumber(status.topBlockHeight) }}
      </span>
    </app-panel>

    <app-panel class="mining-statistics__panel">
      <h5>BLOCK TIME</h5>
      <span class="mining-statistics__value">
        {{ Math.round(blocksPerMinute) }}
        <!--        todo move to mdw-->
      </span>
      min/block
    </app-panel>

    <app-panel class="mining-statistics__panel">
      <h5>MAX TPS</h5>
      <span class="mining-statistics__value">
        {{ maxTPS }}
      </span>
      tx/s
    </app-panel>

    <app-panel class="mining-statistics__panel">
      <h5>TOP MINERS IN LAST 24 HOURS</h5>
      <pie-chart/>
    </app-panel>
  </span>
</template>
<script setup>
import { useMinersStore } from '@/stores/miners'
import { formatAettosToAe } from '@/utils/format'

const { fetchMiners } = useMinersStore()
const {
  minersCount,
  blockReward,
  status,
  blocksPerMinute,
  maxTPS,
} = storeToRefs(useMinersStore())

if (process.client) {
  await fetchMiners()
}
</script>

<style scoped>
.mining-statistics {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: var(--space-2);
  width: 100%;
  margin-bottom: var(--space-2);

  @media (--desktop) {
    flex-direction: row;
  }

  &__panel {
    padding: var(--space-4);
    width: 50%;

    @media (--desktop) {
      width: 18%;
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
}
</style>
