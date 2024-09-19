<template>
  <div class="transaction-statistics">
    <app-panel class="transaction-statistics__panel">
      <h5>MINERS COUNT</h5>
      <div class="transaction-statistics__value">
        {{ minersCount }}
      </div>
    </app-panel>
    <app-panel class="transaction-statistics__panel">
      <h5>REWARD</h5>
      <div class="transaction-statistics__value">
        <!--        <price-label :price="formatAePrice(blockReward)"/>-->
        <price-label :price="formatAettosToAe(blockReward, null)"/>
      </div>
    </app-panel>
    <app-panel class="transaction-statistics__panel">
      <h5>DIFFICULTY</h5>
      <div class="transaction-statistics__value">
        {{ formatNumber(difficulty, 0, 0, 4) }} G
      </div>
    </app-panel>
  </div>
</template>
<script setup>
import { useMinersStore } from '@/stores/miners'
import { formatAettosToAe } from '~/utils/format'

const { fetchMiners } = useMinersStore()
const { minersCount, blockReward, difficulty } = storeToRefs(useMinersStore())

if (process.client) {
  await fetchMiners()
}
</script>

<style scoped>
.transaction-statistics {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  width: 100%;
  margin-bottom: var(--space-2);

  @media (--desktop) {
    flex-direction: row;
  }

  &__panel {
    padding: var(--space-4);
    width: 100%;

    @media (--desktop) {
      width: 50%;
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
