<template>
  {{ know }}
  <br>
  <br>
  <br>
  status
  {{ status }}
  <div class="transaction-statistics">
    <app-panel class="transaction-statistics__panel">
      <h5>MINERS</h5>
      <div class="transaction-statistics__value">
        {{ minersCount }}
      </div>
    </app-panel>
    <app-panel class="transaction-statistics__panel">
      <h5>PEERS</h5>
      <div class="transaction-statistics__value">
        {{ know.peers }}
      </div>
    </app-panel>
    <app-panel class="transaction-statistics__panel">
      <h5>POOLS</h5>
      <div class="transaction-statistics__value">
        {{ MINERS.length }}
      </div>
    </app-panel>
    <app-panel class="transaction-statistics__panel">
      <h5>REWARD</h5>
      <!--      todo why reward is different_-->
      <div class="transaction-statistics__value">
        <!--        <price-label :price="blockReward"/>-->
        <price-label :price="formatAettosToAe(blockReward, null)"/>
      </div>
    </app-panel>
    <app-panel class="transaction-statistics__panel">
      <h5>DIFFICULTY</h5>
      <div class="transaction-statistics__value">
        {{ formatNumber(status.difficulty, 0, 0, 4) }} G
      </div>
    </app-panel>

    <app-panel class="transaction-statistics__panel">
      <h5>TOTAL MINED</h5>
      <div class="transaction-statistics__value">
        TOTAAAL
      </div>
    </app-panel>
    <app-panel class="transaction-statistics__panel">
      <h5>BLOCK TIME</h5>
      <div class="transaction-statistics__value">
        {{ blocksPerMinute }} mins/block
      </div>
    </app-panel>
    <app-panel class="transaction-statistics__panel">
      <h5>HASHRATE</h5>
      <div class="transaction-statistics__value">
        {{ formatNumber(status.hashrate, 0, 0, 4) }} G
      </div>
    </app-panel>
    <app-panel class="transaction-statistics__panel">
      <h5>nr of blocks</h5>
      {{ status.topBlock }}
    </app-panel>
    <app-panel class="transaction-statistics__panel">
      <h5>nr of blocks</h5>
      <pie-chart/>
    </app-panel>
  </div>
</template>
<script setup>
import { useMinersStore } from '@/stores/miners'
import { formatAettosToAe } from '@/utils/format'

const { fetchMiners } = useMinersStore()
const { minersCount, blockReward, difficulty, know, status, blocksPerMinute } = storeToRefs(useMinersStore())

if (process.client) {
  await fetchMiners()
}
</script>

<style scoped>
.transaction-statistics {
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
    width: 100%;
    font-size: 36px;
    font-family: var(--font-monospaced);
    font-weight: 400;
    margin-top: var(--space-3);
  }
}
</style>
