<template>
  <Head>
    <Title>Token</Title>
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

try {
  await fetchTokenDetails(route.params.id)
} catch (error) {
  if ([400, 404].includes(error.response?.status)) {
    throw showError({
      data: {
        entityId: route.params.id,
        entityName: 'Token',
      },
      statusMessage: 'EntityDetailsNotFound',
    })
  }
}
</script>

<style scoped>
.token-details__panel {
  margin-bottom: var(--space-4);
  @media (--desktop) {
    margin-bottom: var(--space-6);
  }
}
</style>
