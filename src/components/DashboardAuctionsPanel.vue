<template>
  <app-panel
    class="dashboard-auctions-panel"
    level="h3"
    icon-name="aens-name"
    show-all-link="/names/?type=in-auction">
    <template #title>
      AUCTIONS ENDING SOON
    </template>
    <template #tooltip>
      These ÆNS names are currently in auction. If someone tries to claim an ÆNS name with a name length &lt;=12,
      an auction is automatically triggered. The auction duration is currently dependent on the length of the
      name. The shorter the name, the longer the auction lives.
    </template>
    <auctions-table class="dashboard-auctions-panel__table"/>
    <auctions-swiper class="dashboard-auctions-panel__swiper"/>
  </app-panel>
</template>

<script setup>
import AppPanel from '@/components/AppPanel'
import AuctionsSwiper from '@/components/AuctionsSwiper'
import AuctionsTable from '@/components/AuctionsTable'
</script>

<style scoped>
.dashboard-auctions-panel {
  padding: var(--space-3) var(--space-1);
  @media (--desktop) {
    padding: var(--space-4);
  }

  &__swiper {
    @media (--desktop) {
      display: none;
    }
  }

  &__table {
    display: none;
    @media (--desktop) {
      display: revert;
    }
  }
}
</style>
