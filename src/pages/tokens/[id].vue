<template>
  <Head>
    <Title>{{ APP_TITLE_SHORT }} | Token</Title>
  </Head>

  <page-header>
    Token

    <template #tooltip>
      {{ tokensHints.token }}
    </template>
  </page-header>

  <template v-if="!isLoading">
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
  <loader-panel v-else/>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import TokenDetailsPanel from '@/components/TokenDetailsPanel'
import TokenHoldersPanel from '@/components/TokenHoldersPanel'
import PageHeader from '@/components/PageHeader'
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

await fetchTokenDetails(route.params.id)

</script>

<style scoped>
.token-details {
  &__panel {
    margin-bottom: var(--space-4);
  }
}
</style>
