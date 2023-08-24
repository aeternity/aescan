<template>
  <Head>
    <Title>{{ APP_TITLE_SHORT }} | Search Results</Title>
  </Head>
  <page-header>
    Search Results
  </page-header>

  <template v-if="!isLoading">
    <app-tabs>
      <app-tab title="Names">
        <search-names-panel/>
      </app-tab>
      <app-tab title="Tokens">
        <search-tokens-panel/>
      </app-tab>
    </app-tabs>
  </template>
  <loader-panel v-else/>
</template>

<script setup>
import PageHeader from '@/components/PageHeader'
import AppTabs from '@/components/AppTabs'
import AppTab from '@/components/AppTab'

const { isLoading } = useLoading()
</script>
