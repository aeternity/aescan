<template>
  <Head>
    <Title>{{ APP_TITLE_SHORT }} | Oracle</Title>
  </Head>

  <page-header>
    Oracle

    <template #tooltip>
      {{ oraclesHints.oracle }}
      <app-link
        variant="primary"
        to="https://docs.aeternity.com/protocol/oracles/">
        Learn more
      </app-link>
    </template>
  </page-header>

  <template v-if="!isLoading">
    <oracle-details-panel
      v-if="oracleDetails"
      class="oracle-details__panel"
      :oracle-details="oracleDetails"/>

    <app-tabs>
      <app-tab title="Events">
        <oracle-events-panel/>
      </app-tab>
    </app-tabs>
  </template>
  <loader-panel v-else/>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import OracleDetailsPanel from '@/components/OracleDetailsPanel'
import PageHeader from '@/components/PageHeader'
import { useOracleDetailsStore } from '@/stores/oracleDetails'
import OracleEventsPanel from '@/components/OracleEventsPanel'
import { oraclesHints } from '@/utils/hints/oraclesHints'

const oracleDetailsStore = useOracleDetailsStore()
const { oracleDetails } = storeToRefs(oracleDetailsStore)
const { fetchOracleDetails } = oracleDetailsStore
const route = useRoute()
const isLoading = useLoading()
await useAsyncData(() => fetchOracleDetails(route.params.id))
</script>

<style scoped>
.oracle-details {
  &__panel {
    margin-bottom: var(--space-6);
  }
}
</style>
