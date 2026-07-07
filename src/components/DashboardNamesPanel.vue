<template>
  <app-panel class="dashboard-names-panel">
    <dashboard-panel-header
      level="h3"
      :title="isAuctionsTab ? 'AUCTIONS ENDING SOON' : 'NAMES RECENTLY ACTIVATED'"
      icon-name="aens-name"
      :show-all-link="isAuctionsTab ? '/names/?type=in-auction' : '/names/?type=active'">
      <template #tooltip>
        <template v-if="isAuctionsTab">
          These ÆNS names are currently in auction. If someone tries to claim an ÆNS name with a name length &lt;=12,
          an auction is automatically triggered. The auction duration is currently dependent on the length of the
          name. The shorter the name, the longer the auction lives.
        </template>
        <template v-else>
          These ÆNS names have recently been activated directly by a claim (name length > 12) or implicitly
          through an expired auction (name length &lt;= 12).
        </template>
      </template>
      <template #header>
        <app-segmented-control
          v-model="activeTab"
          class="dashboard-names-panel__tabs"
          :options="tabOptions"/>
      </template>
    </dashboard-panel-header>

    <p class="dashboard-names-panel__description">
      <template v-if="isAuctionsTab">
        .chain Names can be obtained either immediately or via an auction
        process, if shorter than 13 characters.
      </template>
      <template v-else>
        The æternity blockchain supports protocol-level .chain Names via the
        æternity naming system (AENS).
      </template>
    </p>

    <template v-if="isAuctionsTab">
      <template v-if="!!auctionsEndingSoon?.length">
        <dashboard-auctions-table class="u-hidden-mobile"/>
        <dashboard-auctions-swiper class="u-hidden-desktop"/>
      </template>
      <blank-state v-else/>
    </template>
    <template v-else>
      <template v-if="!!recentlyActivatedNames?.length">
        <dashboard-names-table class="u-hidden-mobile"/>
        <dashboard-names-swiper class="u-hidden-desktop"/>
      </template>
      <blank-state v-else/>
    </template>
  </app-panel>
</template>

<script setup>
const { recentlyActivatedNames, auctionsEndingSoon } = storeToRefs(useNamesStore())

const tabOptions = [
  { value: 'activated', label: 'Recently Activated' },
  { value: 'auctions', label: 'Ending Soon' },
]

const activeTab = ref('activated')
const isAuctionsTab = computed(() => activeTab.value === 'auctions')
</script>

<style scoped>
.dashboard-names-panel {
  padding: var(--space-3) var(--space-1);

  @media (--desktop) {
    padding: var(--space-4);
  }

  &__tabs {
    @media (--desktop) {
      margin-left: var(--space-3);
    }
  }

  /* The segmented tab control must stay visible (and functional) on mobile
     too, since it drives which swiper (activated/auctions) is shown — allow
     it to wrap onto its own line under the title instead of overflowing. */
  :deep(.dashboard-panel-header__container) {
    flex-wrap: wrap;
    row-gap: var(--space-1);
  }

  &__description {
    margin: 0 0 var(--space-3);
    font-size: 12.5px;
    line-height: 20px;
    color: var(--text-dim);
  }
}
</style>
