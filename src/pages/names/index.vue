<template>
  <div class="names">
    <Head>
      <Title>{{ APP_TITLE_SHORT }} | Names</Title>
    </Head>
    <div class="names__parallax">
      <page-header>
        Names
      </page-header>
      <app-tabs
        v-model="activeTabIndex"
        class="names__tabs">
        <app-tab title="Active">
          <names-active-panel/>
        </app-tab>
        <app-tab title="In Auction">
          <names-in-auction-panel/>
        </app-tab>
        <app-tab title="Expired">
          <names-expired-panel/>
        </app-tab>
      </app-tabs>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'nuxt/app'
import AppTab from '@/components/AppTab'
import AppTabs from '@/components/AppTabs'
import NamesActivePanel from '@/components/NamesActivePanel'
import NamesInAuctionPanel from '@/components/NamesInAuctionPanel'
import NamesExpiredPanel from '@/components/NamesExpiredPanel'
import { useNamesStore } from '@/stores/names'
import PageHeader from '@/components/PageHeader'
import { isDesktop } from '@/utils/screen'

const TAB_KEYS = ['active', 'in-auction', 'expired']

const { fetchNamesDetails } = useNamesStore()
const { push } = useRouter()
const route = useRoute()

const activeTabIndex = computed({
  get() {
    const { type } = route.query

    if (type === undefined) {
      return 0
    }

    const index = TAB_KEYS.indexOf(type)

    return index >= 0 ? index : 0
  },
  set(index) {
    push({
      query: {
        type: TAB_KEYS[index],
      },
    })
  },
})

if (process.client) {
  const limit = isDesktop() ? null : 3
  fetchNamesDetails({ limit })
}
</script>

<style scoped>
.names {
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

  &__tabs {
    padding-top: var(--space-4);
    @media (--desktop) {
      padding-top: 0;
    }
  }
}
</style>
