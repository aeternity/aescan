<template>
  <div class="name-details">
    <Head>
      <Title>{{ APP_TITLE_SHORT }} | AENS Name</Title>
    </Head>
    <div class="name-details__parallax">
      <page-header>
        AENS Name
      </page-header>
      <name-details-panel class="name-details__panel"/>
      <name-pointers-special-panel
        v-if="name?.active"
        class="name-details__panel"/>
      <name-pointers-custom-panel
        v-if="hasCustomPanel"
        class="name-details__panel"/>
      <app-tabs
        v-if="hasNameHistory && !!nameActions"
        class="name-details__tabs">
        <app-tab title="History">
          <name-history-panel class="name-details__history"/>
        </app-tab>
      </app-tabs>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useNameDetailsStore } from '@/stores/nameDetails'
import NameDetailsPanel from '@/components/NameDetailsPanel'
import NameHistoryPanel from '@/components/NameHistoryPanel'
import PageHeader from '@/components/PageHeader'
import AppTabs from '@/components/AppTabs'
import AppTab from '@/components/AppTab'
import NamePointersSpecialPanel from '@/components/NamePointersSpecialPanel'
import NamePointersCustomPanel from '@/components/NamePointersCustomPanel'
import { isDesktop } from '@/utils/screen'

const nameDetailsStore = useNameDetailsStore()
const { name, nameHash, hasNameHistory, nameActions } = storeToRefs(nameDetailsStore)
const {
  fetchName,
  fetchNameActions,
} = nameDetailsStore
const route = useRoute()
const { replace } = useRouter()
const hasCustomPanel = computed(() => name.value?.active && !!name.value?.customPointers?.length)

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
  }

  &__history {
    margin-top: var(--space-2);
  }
}
</style>
