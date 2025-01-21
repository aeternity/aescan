<template>
  <Head>
    <Title>AENS Name</Title>
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

import { namesHints } from '@/utils/hints/namesHints'
import { isDesktop } from '@/utils/screen'

const nameDetailsStore = useNameDetailsStore()
const { name, nameHash, hasNameHistory } = storeToRefs(nameDetailsStore)
const {
  fetchName,
  fetchNameActions,
} = nameDetailsStore
const route = useRoute()
const hasCustomPanel = computed(() => name.value?.active && !!name.value?.customPointers?.length)

const { isLoading } = useLoading()

try {
  await fetchName(route.params.name)
} catch (error) {
  if (error.response?.status === 404) {
    throw showError({
      data: {
        entityId: route.params.name,
        entityName: 'Name',
      },
      statusMessage: 'EntityDetailsNotFound',
    })
  } else {
    throw error
  }
}

if (hasNameHistory && process.client) {
  const limit = isDesktop() ? 10 : 3
  fetchNameActions({ queryParameters: `/v3/accounts/${nameHash.value}/activities?limit=${limit}` })
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
