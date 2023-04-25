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
        <client-only>
          <blockchain-panel/>
        </client-only>
      </div>

      <div class="dashboard__row">
        <div class="dashboard__column">
          <h2 class="dashboard__heading">
            .chain names
          </h2>
          <p class="dashboard__paragraph">
            The æternity blockchain supports protocol-level .chain names via the æternity naming system
            (AENS).
          </p>
          <client-only>
            <names-panel/>
          </client-only>
        </div>
        <div class="dashboard__column">
          <h2 class="dashboard__heading">
            .chain name auctions
          </h2>
          <p class="dashboard__paragraph">
            .chain names can be obtained either immediately or via an auction
            process, if shorter than 13 characters.
          </p>
          <client-only>
            <auctions-panel>Auctions ending soon</auctions-panel>
          </client-only>
        </div>
      </div>

      <div class="dashboard__column">
        <h2 class="dashboard__heading">
          State channels
        </h2>
        <p class="dashboard__paragraph">
          State Channels allow the gas-free execution of smart contracts and
          transactions, privately and with the speed of light, while still
          being able to escalate on-chain in case of disagreement.
          <app-link
            class="dashboard__link"
            to="https://aeternity.com/state-channels"
            is-text-link>
            Learn more
          </app-link>
        </p>
        <client-only>
          <state-channels-panel class="dashboard__state-channels-panel"/>
        </client-only>
      </div>
    </div>
  </div>
</template>

<script setup>
import NamesPanel from '@/components/NamesPanel'
import AuctionsPanel from '@/components/AuctionsPanel'
import BlockchainPanel from '@/components/BlockchainPanel'
import StateChannelsPanel from '@/components/StateChannelsPanel'
import AppHero from '@/components/AppHero'
import AppLink from '@/components/AppLink'

if (process.client) {
  const {
    fetchSelectedMicroblocksInfo,
    fetchDeltaStats,
  } = useRecentBlocksStore()
  const { fetchBlockchainStats } = useBlockchainStatsStore()
  const { fetchStateChannels } = useStateChannelsStore()
  const { fetchInAuctionNames, fetchRecentlyActivatedNames } = useNamesStore()

  // fetch client-side only due to very dynamic nature of the data and limit difference depending on desktop/mobile view
  await useAsyncData(() => Promise.all([
    fetchStateChannels(),
    fetchInAuctionNames(),
    fetchRecentlyActivatedNames(),
    fetchSelectedMicroblocksInfo(),
    fetchBlockchainStats(),
    fetchDeltaStats(),
  ]))
}
</script>

<style scoped>
.dashboard {
  &__container {
    max-width: var(--container-width);
    margin: 0 auto;
    padding: var(--space-3) var(--space-1) var(--space-3) var(--space-1);

    @media (--desktop) {
      padding: 0;
    }
  }

  &__row {
    display: flex;
    flex-direction: column;
    gap: var(--space-3) var(--space-4);
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

  &__state-channels-panel {
    margin-bottom: 120px;
  }

  &__link {
    font-size: 14px;
    line-height: 20px;
    font-family: var(--font-monospaced);
  }
}
</style>
