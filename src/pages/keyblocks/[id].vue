<template>
  <Head>
    <Title>Keyblock</Title>
  </Head>

  <page-header>
    Keyblock
    <template #tooltip>
      {{ keyblocksHints.keyblock }}
    </template>
  </page-header>

  <template v-if="!isLoading">
    <keyblock-details-panel
      v-if="keyblockDetails"
      class="keyblock-details__keyblock-details-panel"
      :keyblock-details="keyblockDetails"/>

    <app-tabs
      v-if="isKeyblockExistent"
      v-model="activeTabIndex">
      <app-tab title="Microblocks">
        <keyblock-microblocks-panel/>
      </app-tab>
      <app-tab title="Transactions">
        <keyblock-transactions-panel/>
      </app-tab>
    </app-tabs>
  </template>
  <loader-panel v-else/>
</template>

<script setup>
import { keyblocksHints } from '@/utils/hints/keyblocksHints'

const TAB_KEYS = ['microblocks', 'transactions']

const { keyblockDetails } = storeToRefs(useKeyblockDetailsStore())
const { fetchKeyblock } = useKeyblockDetailsStore()

const route = useRoute()
const { push, replace } = useRouter()

const { isLoading } = useLoading()

const isKeyblockExistent = computed(() => keyblockDetails.value && keyblockDetails.value.isExistent !== false)

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
      return replace(newRoute)
    }
    return push(newRoute)
  },
})

if (import.meta.client) {
  fetchKeyblock(route.params.id)
}
</script>

<style scoped>
.keyblock-details__keyblock-details-panel {
  margin-bottom: var(--space-4);

  @media (--desktop) {
    margin-bottom: var(--space-6);
  }
}
</style>
