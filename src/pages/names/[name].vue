<template>
  <Head>
    <Title>{{ APP_TITLE_SHORT }} | AENS Name</Title>
  </Head>

  <page-header>
    AENS Name

    <template #tooltip>
      {{ namesHints.name }}
      <app-link
        variant="primary"
        to="https://docs.aeternity.com/protocol/AENS/">
        Learn more
      </app-link>
    </template>
  </page-header>

  <template v-if="!isLoading">
    <name-details-panel class="name-details__panel"/>

    <name-pointers-special-panel
      v-if="name?.active"
      class="name-details__panel"/>
    <name-pointers-custom-panel
      v-if="hasCustomPanel"
      class="name-details__panel"/>
    <app-tabs v-if="hasNameHistory">
      <app-tab title="History">
        <name-history-panel/>
      </app-tab>
    </app-tabs>
  </template>
  <loader-panel v-else/>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useNameDetailsStore } from '@/stores/nameDetails'
import NameDetailsPanel from '@/components/NameDetailsPanel'
import NameHistoryPanel from '@/components/NameHistoryPanel'
import NamePointersSpecialPanel from '@/components/NamePointersSpecialPanel'
import NamePointersCustomPanel from '@/components/NamePointersCustomPanel'
import PageHeader from '@/components/PageHeader'
import AppTabs from '@/components/AppTabs'
import AppTab from '@/components/AppTab'
import { namesHints } from '@/utils/hints/namesHints'
import { isDesktop } from '@/utils/screen'

const nameDetailsStore = useNameDetailsStore()
const { name, nameHash, hasNameHistory } = storeToRefs(nameDetailsStore)
const {
  fetchName,
  fetchNameActions,
} = nameDetailsStore
const route = useRoute()
const { replace } = useRouter()
const hasCustomPanel = computed(() => name.value?.active && !!name.value?.customPointers?.length)

const { isLoading } = useLoading()

try {
  await fetchName(route.params.name)
} catch (error) {
  replace(`/error/${route.params.name}`)
}

if (hasNameHistory && process.client) {
  const limit = isDesktop() ? 10 : 3
  fetchNameActions({ queryParameters: `/v2/accounts/${nameHash.value}/activities?limit=${limit}` })
}
</script>

<style scoped>
.name-details {
  &__panel {
    margin-bottom: var(--space-4);
    @media (--desktop) {
      margin-bottom: var(--space-6);
    }
  }
}
</style>
