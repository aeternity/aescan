<template>
  <app-panel class="dashboard-auctions-panel">
    <dashboard-panel-header
      level="h3"
      title="AUCTIONS ENDING SOON"
      icon-name="aens-name"
      show-all-link="/names/?type=in-auction">
      <template #tooltip>
        These ÆNS names are currently in auction. If someone tries to claim an ÆNS name with a name length &lt;=12,
        an auction is automatically triggered. The auction duration is currently dependent on the length of the
        name. The shorter the name, the longer the auction lives.
      </template>
    </dashboard-panel-header>
    <template v-if="!!auctionsEndingSoon.length">
      <dashboard-auctions-table class="u-hidden-mobile"/>
      <dashboard-auctions-swiper class="u-hidden-desktop"/>
    </template>
    <blank-state v-else/>
  </app-panel>
</template>

<script setup>

const { auctionsEndingSoon } = storeToRefs(useNamesStore())
</script>

<style scoped>
.dashboard-auctions-panel {
  padding: var(--space-3) var(--space-1);

  @media (--desktop) {
    padding: var(--space-4);
  }
}
</style>
