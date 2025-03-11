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
      class="token-details__panel"
      :token-details="tokenDetails"
      :token-holders-count="tokenHoldersCount"/>

    <app-tabs v-model="activeTabIndex">
      <app-tab title="Holders">
        <token-holders-panel/>
      </app-tab>
      <app-tab title="Events">
        <token-events-panel/>
      </app-tab>
      <app-tab
        v-if="featureFlags.dex"
        title="Trades">
        <token-trades-panel/>
      </app-tab>
    </app-tabs>
  </template>
  <loader-panel v-else/>
</template>

<script setup>
import { tokensHints } from '@/utils/hints/tokensHints'

const { tokenDetails, tokenHoldersCount } = storeToRefs(useTokenDetailsStore())
const { fetchTokenDetails } = useTokenDetailsStore()

const featureFlags = useFeatureFlags()

const TAB_KEYS = ['holders', 'events', 'trades']

const route = useRoute()
const { push, replace } = useRouter()

const { isLoading } = useLoading()

const activeTabIndex = computed({
  get() {
    const { type: activeTabName } = route.query

    if (activeTabName === undefined) {
      return 0
    }

    return TAB_KEYS.indexOf(activeTabName)
  },
  set(index) {
    const newRoute = {
      query: {
        type: TAB_KEYS[index],
      },
    }

    if (activeTabIndex.value === index) {
      // if navigating back
      return replace(newRoute)
    }

    return push(newRoute)
  },
})

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
