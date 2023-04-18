<template>
  <div class="token-details">
    <Head>
      <Title>{{ APP_TITLE_SHORT }} | Token Details</Title>
    </Head>
    <div
      class="token-details__parallax">
      <page-header>
        Token Details
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
    </div>
  </div>
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
    queryParameters: `/v2/contracts/logs?contract=${route.params.id}&limit=${limit}`,
  })
}
</script>

<style scoped>
.token-details {
  background-image: url("@/assets/background.svg");
  background-color: var(--color-midnight-35);
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  &__parallax {
    padding: 120px var(--space-1) var(--space-6);
    max-width: var(--container-width);
    margin: 0 auto;
    @media (--desktop) {
      padding: 120px 0;
    }
  }

  &__panel {
    margin-bottom: var(--space-6);

    &:last-of-type {
      margin-bottom: 0;
    }
  }
}
</style>
