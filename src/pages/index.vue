<template>
  <div class="dashboard">
    <div class="dashboard__row">
      <app-hero/>
    </div>

    <div class="dashboard__container">
      <div class="dashboard__row">
        <div class="dashboard__column">
          <h2 class="dashboard__heading">
            æternity by the block
          </h2>
        </div>
        <div class="dashboard__column">
          <p class="dashboard__paragraph dashboard__paragraph--horizontal">
            Discover and navigate through the æternity blockchain mainnet, powered by
            Next-Generation-Nakamoto-Consensus (Bitcoin-NG).
            <app-link
              class="dashboard__link"
              to="https://medium.com/aeternity-crypto-foundation/aeternity-bitcoin-ng-the-way-it-was-meant-to-be-df7bb1d65a4b"
              is-text-link>
              Learn more
            </app-link>
            <br>
            Soon also with Hyperchains support!
          </p>
        </div>
      </div>
      <div class="dashboard__row">
        <client-only v-if="!isLoading">
          <dashboard-keyblock-panel/>
        </client-only>
        <loader-panel
          v-else
          class="dashboard__loader-panel"/>
      </div>

      <div class="dashboard__row">
        <div class="dashboard__column">
          <h2 class="dashboard__heading">
            .chain names
          </h2>
          <p class="dashboard__paragraph">
            The æternity blockchain supports protocol-level .chain Names via the
            æternity naming system (AENS).
          </p>
          <dashboard-names-panel/>
        </div>
        <div class="dashboard__column">
          <h2 class="dashboard__heading">
            .chain Name Auctions
          </h2>
          <p class="dashboard__paragraph">
            .chain Names can be obtained either immediately or via an auction
            process, if shorter than 13 characters.
          </p>
          <dashboard-auctions-panel>Auctions ending soon</dashboard-auctions-panel>
        </div>
      </div>

      <div class="dashboard__row">
        <div class="dashboard__column">
          <h2 class="dashboard__heading">
            State Channels
          </h2>
          <p class="dashboard__paragraph">
            State Channels allow the gas-free execution of smart contracts and
            transactions, privately and with the speed of light, while still
            being able to escalate on-chain in case of disagreement.
            <app-link
              class="dashboard__link"
              to="https://aeternity.com/state-channels">
              Learn more
            </app-link>
          </p>
          <dashboard-state-channels-panel/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import DashboardNamesPanel from '@/components/DashboardNamesPanel'
import DashboardStateChannelsPanel from '@/components/DashboardStateChannelsPanel'
import AppHero from '@/components/AppHero'
import AppLink from '@/components/AppLink'
import { useWebSocket } from '@/stores/webSocket'
import { useDashboardStateChannelsStore } from '@/stores/dashboardStateChannels'

const {
  fetchSelectedMicroblocksInfo,
  fetchDeltaStats,
} = useRecentBlocksStore()
const {
  fetchTotalStats,
  fetchMaxTps,
  fetchTotalTransactionsCount,
} = useBlockchainStatsStore()
const { fetchStateChannels } = useDashboardStateChannelsStore()
const { fetchInAuctionNames, fetchRecentlyActivatedNames } = useNamesStore()
const webSocketStore = useWebSocket()
const { isSubscribedToKeyblockDetails } = storeToRefs(webSocketStore)

definePageMeta({
  layout: 'empty',
})

const isLoading = ref(true)

await useAsyncData(() => Promise.all([
  fetchStateChannels(),
  fetchInAuctionNames(),
  fetchRecentlyActivatedNames(),
  fetchTotalStats(),
  fetchMaxTps(),
]))

// fetch client-side only due to very dynamic nature of the data and limit difference depending on desktop/mobile view
await useAsyncData(() => Promise.all([
  fetchSelectedMicroblocksInfo(),
  fetchTotalTransactionsCount(),
  fetchDeltaStats(),
]).then(() => {
  isLoading.value = false
}), { server: false })

onBeforeMount(() => {
  isSubscribedToKeyblockDetails.value = true
})
onBeforeUnmount(() => {
  isSubscribedToKeyblockDetails.value = false
})

</script>

<style scoped>
.dashboard {
  &__container {
    max-width: var(--container-width);
    margin: 0 auto;
    padding: var(--space-3) var(--space-1) var(--space-3) var(--space-1);

    @media (--desktop) {
      padding: 0;
      margin-bottom: 80px;
    }
  }

  &__row {
    display: flex;
    flex-direction: column;
    gap: var(--space-3) var(--space-6);
    margin-bottom: var(--space-4);

    @media (--desktop) {
      flex-direction: row;
      margin-bottom: var(--space-6);
      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }

  &__column {
    flex: 1 1 0;
  }

  &__heading {
    margin: 0 var(--space-1);
    @media (--desktop) {
      margin: 0;
    }
  }

  &__paragraph {
    margin: var(--space-3) var(--space-1) var(--space-4);
    @media (--desktop) {
      margin: var(--space-3) 0 var(--space-6);
    }

    &--horizontal {
      margin: 0 var(--space-1);
      @media (--desktop) {
        margin: 0;
      }
    }
  }

  &__link {
    font-size: 14px;
    line-height: 20px;
    font-family: var(--font-monospaced);
  }

  &__loader-panel {
    width: 100%;
  }
}
</style>
