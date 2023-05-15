<template>
  <app-panel class="auctions-panel">
    <panel-header
      level="h3"
      title="AUCTIONS ENDING SOON"
      icon-name="aens-name"
      show-all-link="/names/?type=in-auction">
      <template #tooltip>
        These ÆNS names are currently in auction. If someone tries to claim an ÆNS name with a name length &lt;=12,
        an auction is automatically triggered. The auction duration is currently dependent on the length of the
        name. The shorter the name, the longer the auction lives.
      </template>
    </panel-header>
    <auctions-table class="auctions-panel__table"/>
    <auctions-swiper class="auctions-panel__swiper"/>
  </app-panel>
</template>

<script setup>
import AppPanel from '@/components/AppPanel'
import PanelHeader from '@/components/PanelHeader'
import AuctionsSwiper from '@/components/AuctionsSwiper'
import AuctionsTable from '@/components/AuctionsTable'
</script>

<style scoped>
.auctions-panel {
  padding: var(--space-4) var(--space-1);
  @media (--desktop) {
    padding: var(--space-4) var(--space-4) var(--space-3);
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
