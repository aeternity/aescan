<template>
  <Head>
    <Title>{{ APP_TITLE_SHORT }} | Search</Title>
  </Head>

  <page-header>
    Search
  </page-header>
  <template v-if="!isLoading">
    <app-tabs>
      <app-tab title="Names">
        <search-names-panel class="search__panel"/>
      </app-tab>
      <app-tab title="Tokens">
        <search-tokens-panel class="search__panel"/>
      </app-tab>
    </app-tabs>

    <app-panel class="search__panel">
      <template #heading>
        Accounts
      </template>
    </app-panel>

    <app-panel class="search__panel">
      <template #heading>
        Transactions
      </template>
    </app-panel>

    <app-panel class="search__panel">
      <template #heading>
        Smart Contracts
      </template>
    </app-panel>

    <app-panel class="search__panel">
      <template #heading>
        Oracles
      </template>
    </app-panel>

    <app-panel class="search__panel">
      <template #heading>
        State Channels
      </template>
    </app-panel>
  </template>
  <loader-panel v-else/>
</template>

<!--          todo  contents-->
<!--todo routing-->

<!--            todo hints-->
<!--todo imports-->

<script setup>
import PageHeader from '~/components/PageHeader'
import AppTabs from '~/components/AppTabs'
import AppTab from '~/components/AppTab'
import AppPanel from '~/components/AppPanel'

const { isLoading } = useLoading()

</script>

<style scoped>
.search {
  &__panel {
    margin-bottom: var(--space-4);
    @media (--desktop) {
      margin-bottom: var(--space-6);
    }
  }
}
</style>
