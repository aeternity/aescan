<template>
  <Head>
    <Title>{{ APP_TITLE_SHORT }} | Token</Title>
  </Head>

  <page-header>
    Token
  </page-header>

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

<script setup>
import { storeToRefs } from 'pinia'
import TokenDetailsPanel from '@/components/TokenDetailsPanel'
import TokenHoldersPanel from '@/components/TokenHoldersPanel'
import PageHeader from '@/components/PageHeader'
import { useTokenDetailsStore } from '@/stores/tokenDetails'
import AppTabs from '~/components/AppTabs.vue'
import AppTab from '~/components/AppTab.vue'
import TokenEventsPanel from '~/components/TokenEventsPanel.vue'
import { isDesktop } from '~/utils/screen'

const route = useRoute()

const tokenDetailsStore = useTokenDetailsStore()
const { tokenDetails } = storeToRefs(tokenDetailsStore)
const { fetchTokenDetails, fetchTokenEvents } = tokenDetailsStore

await fetchTokenDetails(route.params.id)

if (process.client) {
  const limit = isDesktop() ? 10 : 3
  await fetchTokenEvents({
    limit: limit.value,
    contractId: route.params.id,
  })
}
</script>

<style scoped>
.token-details {
  &__panel {
    margin-bottom: var(--space-6);

    &:last-of-type {
      margin-bottom: 0;
    }
  }
}
</style>
