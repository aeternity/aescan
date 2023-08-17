<template>
  <Head>
    <Title>{{ APP_TITLE_SHORT }} | Search</Title>
  </Head>

  <page-header>
    Search
  </page-header>

  <app-tabs>
    <app-tab title="Names">
      <search-results-names-panel/>
    </app-tab>
    <app-tab title="Tokens">
      <serch-results-tokens-panel/>
    </app-tab>
  </app-tabs>

  <app-panel>
    <template #heading>
      Accounts
    </template>
  </app-panel>

  <app-panel>
    <template #heading>
      Transactions
    </template>
  </app-panel>

  <app-panel>
    <template #heading>
      Smart Contracts
    </template>
  </app-panel>

  <app-panel>
    <template #heading>
      Oracles
    </template>
  </app-panel>

  <app-panel>
    <template #heading>
      State Channels
    </template>
  </app-panel>
</template>

<!--          todo  tokens icons-->
<!--            todo pagination-->
<!--            todo hints-->
<!--            todo loading-->

<script setup>
import PageHeader from '~/components/PageHeader'
import AppTabs from '~/components/AppTabs'
import AppTab from '~/components/AppTab'
import AppPanel from '~/components/AppPanel'
import SearchResultsNamesPanel from '~/pages/search/SearchResultsNamesPanel'
import SerchResultsTokensPanel from '~/pages/search/SerchResultsTokensPanel'
</script>
