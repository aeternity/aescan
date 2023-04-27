<template>
  <div class="oracle-details">
    <Head>
      <Title>{{ APP_TITLE_SHORT }} | Oracle Details</Title>
    </Head>
    <div class="oracle-details__parallax">
      <page-header>
        Oracle Details
      </page-header>

      <oracle-details-panel
        v-if="oracleDetails"
        class="oracle-details__panel"
        :oracle-details="oracleDetails"/>
    </div>

    <app-tabs>
      <app-tab title="Events">
        <oracle-events-panel/>
      </app-tab>
    </app-tabs>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import OracleDetailsPanel from '@/components/OracleDetailsPanel'
import PageHeader from '@/components/PageHeader'
import { useOracleDetailsStore } from '@/stores/oracleDetails'
import OracleEventsPanel from '~/pages/oracles/OracleEventsPanel'

const oracleDetailsStore = useOracleDetailsStore()
const { oracleDetails } = storeToRefs(oracleDetailsStore)
const { fetchOracleDetails } = oracleDetailsStore
const route = useRoute()

await useAsyncData(() => fetchOracleDetails(route.params.id))
</script>

<style scoped>
.oracle-details {
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
}
</style>
