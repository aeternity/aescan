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
      v-if="hasCustomPointers"
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

const { name, hasNameHistory, hasCustomPointers } = storeToRefs(useNameDetailsStore())
const { fetchNameDetails, fetchNameHistory } = useNameDetailsStore()
const route = useRoute()

const { isLoading } = useLoading()

if (import.meta.client) {
  await fetchNameDetails(route.params.name)
}

if (hasNameHistory && import.meta.client) {
  await fetchNameHistory({ nameHash: name.value.hash })
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
