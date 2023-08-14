<template>
  <Head>
    <Title>{{ APP_TITLE_SHORT }} | Oracle</Title>
  </Head>

  <page-header>
    Oracle

    <template v-if="!isOracleFound">
      not found
    </template>

    <template #tooltip>
      {{ oraclesHints.oracle }}
      <app-link
        variant="primary"
        to="https://docs.aeternity.com/protocol/oracles/">
        Learn more
      </app-link>
    </template>
  </page-header>

  <template v-if="!isLoading && isOracleFound">
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
  <loader-panel v-else-if="isLoading"/>
  <not-found-panel v-else>
    Oops! We are sorry. The oracle identified by
    <q>
      {{ route.params.id }}
    </q>
    was not found.
  </not-found-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import OracleDetailsPanel from '@/components/OracleDetailsPanel'
import PageHeader from '@/components/PageHeader'
import { useOracleDetailsStore } from '@/stores/oracleDetails'
import OracleEventsPanel from '@/components/OracleEventsPanel'
import NotFoundPanel from '@/components/NotFoundPanel'
import { oraclesHints } from '@/utils/hints/oraclesHints'

const oracleDetailsStore = useOracleDetailsStore()
const { oracleDetails } = storeToRefs(oracleDetailsStore)
const { fetchOracleDetails } = oracleDetailsStore
const route = useRoute()
const { isLoading } = useLoading()

const isOracleFound = ref(true)

const { error } = await useAsyncData(() => fetchOracleDetails(route.params.id))

if (error.value) {
  isOracleFound.value = false
  setResponseStatus(404, 'Oracle not found')
}
</script>

<style scoped>
.oracle-details {
  &__panel {
    margin-bottom: var(--space-6);
  }
}
</style>
