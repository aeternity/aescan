<template>
  <Head>
    <Title>{{ APP_TITLE_SHORT }} | Search Results</Title>
  </Head>

  <page-header>
    Search Results
  </page-header>

  <template v-if="!isLoading">
    <app-tabs class="search__panel">
      <app-tab title="Names">
        <search-names-panel/>
      </app-tab>
      <app-tab title="Tokens">
        <search-tokens-panel/>
      </app-tab>
    </app-tabs>

    <search-keyblock-panel
      v-if="isKeyblockPanelDisplayed"
      :keyblock-results="keyblockResults"
      class="search__panel"/>
  </template>
  <loader-panel v-else/>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import PageHeader from '@/components/PageHeader'
import AppTabs from '@/components/AppTabs'
import AppTab from '@/components/AppTab'
import { useSearchStore } from '@/stores/search'
import SearchKeyblockPanel from '@/pages/search/SearchKeyblockPanel'

const { isLoading } = useLoading()
const searchStore = useSearchStore()

const { keyblockResults } = storeToRefs(searchStore)
const { fetchKeyblockResults } = searchStore

const route = useRoute()

await fetchKeyblockResults(route.params.id)

const isKeyblockPanelDisplayed = computed(() => {
  return keyblockResults.value && !keyblockResults.value.notExistent
})

</script>

<style scoped>
.search {
  &__panel {
    margin-bottom: var(--space-4);
    @media (--desktop) {
      margin-bottom: var(--space-6);
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
