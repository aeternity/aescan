<template>
  <Head>
    <Title>{{ APP_TITLE_SHORT }} | Token</Title>
  </Head>

  <page-header>
    Token

    <template v-if="!isTokenFound">
      not found
    </template>

    <template #tooltip>
      {{ tokensHints.token }}
    </template>
  </page-header>

  <template v-if="!isLoading && isTokenFound">
    <token-details-panel
      v-if="tokenDetails"
      class="token-details__panel"
      :token-details="tokenDetails"/>

    <app-tabs>
      <app-tab title="Holders">
        <token-holders-panel/>
      </app-tab>
      <app-tab title="Events">
        <token-events-panel/>
      </app-tab>
    </app-tabs>
  </template>
  <loader-panel v-else-if="isLoading"/>
  <not-found-panel v-else>
    Oops! We are sorry. The token identified by
    <q>
      {{ route.params.id }}
    </q>
    was not found.
  </not-found-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import TokenDetailsPanel from '@/components/TokenDetailsPanel'
import TokenHoldersPanel from '@/components/TokenHoldersPanel'
import PageHeader from '@/components/PageHeader'
import NotFoundPanel from '@/components/NotFoundPanel'
import { useTokenDetailsStore } from '@/stores/tokenDetails'
import AppTabs from '@/components/AppTabs'
import AppTab from '@/components/AppTab'
import { tokensHints } from '@/utils/hints/tokensHints'
import TokenEventsPanel from '@/components/TokenEventsPanel'

const route = useRoute()

const tokenDetailsStore = useTokenDetailsStore()
const { tokenDetails } = storeToRefs(tokenDetailsStore)
const { fetchTokenDetails } = tokenDetailsStore

const { isLoading } = useLoading()
const isTokenFound = ref(true)

try {
  await fetchTokenDetails(route.params.id)
} catch (error) {
  if ([400, 404].includes(error.response?.status)) {
    isTokenFound.value = false
    setResponseStatus(404, 'Token not found')
  }
}
</script>

<style scoped>
.token-details {
  &__panel {
    margin-bottom: var(--space-6);
  }
}
</style>
