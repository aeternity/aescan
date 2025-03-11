<template>
  <Head>
    <Title>Microblock</Title>
  </Head>

  <page-header>
    Microblock
    <template #tooltip>
      {{ microblocksHints.microblock }}
    </template>
  </page-header>
  <template v-if="!isLoading">
    <microblock-details-panel
      v-if="microblockDetails"
      class="microblock-details__microblock-details-panel"
      :microblock-details="microblockDetails"/>

    <app-tabs v-if="microblockDetails">
      <app-tab title="Transactions">
        <microblock-transactions-panel/>
      </app-tab>
    </app-tabs>
  </template>
  <loader-panel v-else/>
</template>

<script setup>
import { useRoute } from 'nuxt/app'
import { microblocksHints } from '@/utils/hints/microblocksHints'

const { microblockDetails } = storeToRefs(useMicroblockDetailsStore())
const { fetchMicroblock } = useMicroblockDetailsStore()

const route = useRoute()

const { isLoading } = useLoading()

if (process.client) {
  await fetchMicroblock(route.params.id)
}
</script>

<style scoped>
.microblock-details__microblock-details-panel {
  margin-bottom: var(--space-4);

  @media (--desktop) {
    margin-bottom: var(--space-6);
  }
}
</style>
