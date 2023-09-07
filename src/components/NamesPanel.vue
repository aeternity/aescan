<template>
  <!--  todo rename to dashboard-->
  <app-panel
    class="names-panel"
    level="h3"
    icon-name="aens-name">
    <template #title>
      RECENTLY ACTIVATED NAMES
    </template>
    <template #tooltip>
      These ÆNS names have recently been activated directly by a claim (name length > 12) or implicitly
      through an expired auction (name length &lt;= 12).
    </template>
    <template #end>
      <app-link
        is-text-link
        to="/names/?type=active"
        class="names-panel__link">
        Show all
      </app-link>
      <!--      todo class and clean mess-->
    </template>
    <names-table class="names-panel__table"/>
    <names-swiper class="names-panel__swiper"/>
  </app-panel>
</template>

<script setup>
import AppPanel from '@/components/AppPanel'
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
