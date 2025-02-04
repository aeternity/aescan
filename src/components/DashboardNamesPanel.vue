<template>
  <app-panel class="dashboard-names-panel">
    <dashboard-panel-header
      level="h3"
      title="NAMES RECENTLY ACTIVATED"
      icon-name="aens-name"
      show-all-link="/names/?type=active">
      <template #tooltip>
        These ÆNS names have recently been activated directly by a claim (name length > 12) or implicitly
        through an expired auction (name length &lt;= 12).
      </template>
    </dashboard-panel-header>
    <template v-if="!!recentlyActivatedNames.length">
      <dashboard-names-table class="u-hidden-mobile"/>
      <dashboard-names-swiper class="u-hidden-desktop"/>
    </template>
    <blank-state v-else/>
  </app-panel>
</template>

<script setup>
const { recentlyActivatedNames } = storeToRefs(useNamesStore())
</script>

<style scoped>
.dashboard-names-panel {
  padding: var(--space-3) var(--space-1);

  @media (--desktop) {
    padding: var(--space-4);
  }
}
</style>
