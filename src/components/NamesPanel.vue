<template>
  <app-panel class="names-panel">
    <panel-header
      level="h3"
      title="NAMES RECENTLY ACTIVATED"
      icon-name="aens-name"
      show-all-link="/names/?type=active">
      <template #tooltip>
        These ÆNS names have recently been activated directly by a claim (name length > 12) or implicitly
        through an expired auction (name length &lt;= 12).
      </template>
    </panel-header>
    <names-table class="names-panel__table"/>
    <names-swiper class="names-panel__swiper"/>
  </app-panel>
</template>

<script setup>
import AppPanel from '@/components/AppPanel'

import PanelHeader from '@/components/PanelHeader'
import NamesSwiper from '@/components/NamesSwiper'
import NamesTable from '@/components/NamesTable'
</script>

<style scoped>
.names-panel {
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
