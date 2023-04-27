<template>
  <Head>
    <Title>{{ APP_TITLE_SHORT }} | Oracle</Title>
  </Head>
  <page-header>
    Oracle
  </page-header>

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

<script setup>
import { storeToRefs } from 'pinia'
import OracleDetailsPanel from '@/components/OracleDetailsPanel'
import PageHeader from '@/components/PageHeader'
import { useOracleDetailsStore } from '@/stores/oracleDetails'
import OracleEventsPanel from '~/pages/oracles/OracleEventsPanel'

const oracleDetailsStore = useOracleDetailsStore()
const { oracleDetails } = storeToRefs(oracleDetailsStore)
const { fetchOracleDetails } = oracleDetailsStore
const route = useRoute()

await useAsyncData(() => fetchOracleDetails(route.params.id))
</script>

<style scoped>
.oracle-details {
  &__panel {
    margin-bottom: var(--space-6);
  }
}
</style>
