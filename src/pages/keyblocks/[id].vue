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

    <app-tabs v-if="isKeyblockExistent">
      <app-tab title="Microblocks">
        <keyblock-microblocks-panel/>
      </app-tab>
    </app-tabs>
  </template>
  <loader-panel v-else/>
</template>

<script setup>
import { keyblocksHints } from '@/utils/hints/keyblocksHints'

const { keyblockDetails } = storeToRefs(useKeyblockDetailsStore())
const { fetchKeyblock } = useKeyblockDetailsStore()

const route = useRoute()

const { isLoading } = useLoading()

const isKeyblockExistent = computed(() => keyblockDetails.value && keyblockDetails.value.isExistent !== false)

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
