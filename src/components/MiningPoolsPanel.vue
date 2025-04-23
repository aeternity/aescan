<template>
  <app-panel class="mining-pools-panel">
    <paginated-content
      :entities="{ data: MINING_POOLS }"
      :total-count="MINING_POOLS.length">
      <mining-pools-table :pools="MINING_POOLS"/>
    </paginated-content>
  </app-panel>
</template>
