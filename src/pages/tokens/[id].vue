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
  </app-tabs>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import TokenDetailsPanel from '@/components/TokenDetailsPanel'
import TokenHoldersPanel from '@/components/TokenHoldersPanel'
import AppTabs from '@/components/AppTabs'
import AppTab from '@/components/AppTab'
import PageHeader from '@/components/PageHeader'
import { useTokenDetailsStore } from '@/stores/tokenDetails'

const tokenDetailsStore = useTokenDetailsStore()
const { tokenDetails } = storeToRefs(tokenDetailsStore)
const { fetchTokenDetails } = tokenDetailsStore
const route = useRoute()

await fetchTokenDetails(route.params.id)
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
