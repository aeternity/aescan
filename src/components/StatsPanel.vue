<template>
  <app-panel
    v-if="!isLoading"
    class="stats-panel">
    <stats-tile
      class="stats-panel__stats-tile"
      title="TRANSACTIONS"
      icon-name="transactions">
      <div>
        Max TPS: <span class="stats-panel__value">{{ formatNullable(formatNumber(maxTps)) }}</span>
      </div>
      <div>
        Total: <span class="stats-panel__value">{{ formatNullable(formatNumber(transactionsCount)) }}</span>
      </div>
      <template #tooltip>
        Numbers are counting on-chain transactions only. There can be millions of transactions executed off-chain in
        <app-link
          variant="primary"
          to="https://aeternity.com/state-channels">
          State Channels
        </app-link>
        .
      </template>
    </stats-tile>
    <stats-tile
      class="stats-panel__stats-tile"
      title="LATEST KEYBLOCK"
      icon-name="latest-keyblock">
      <div>
        Height:
        <span class="stats-panel__value">
          <app-link
            v-if="blockHeight"
            :to="`/keyblocks/${blockHeight}`">
            {{ blockHeight }}
          </app-link>
          <template v-else>
            N/A
          </template>
        </span>
      </div>
      <div>
        Transactions:
        <span class="stats-panel__value">
          {{ formatNullable(formatNumber(latestKeyblockTransactionsCount)) }}
        </span>
      </div>
      <template #tooltip>
        Current block height reflects the total amount of mined keyblocks. The current leader added the shown amount of
        transactions in multiple microblocks that can be created every 3 seconds.
      </template>
    </stats-tile>
    <stats-tile
      class="stats-panel__stats-tile"
      title="KEYBLOCK REWARD"
      icon-name="keyblock-reward">
      <div>
        Beneficiary:
        <price-label
          class="stats-panel__value"
          :price="latestReward"
          :max-digits="2"
          :has-icon="false"/>
      </div>
      <template #tooltip>
        For each mined keyblock a reward is distributed. The amount of Æ distributed depends on the inflation curve.
        The beneficiary receives 89,10% and the
        <app-link
          variant="primary"
          to="https://blog.aeternity.com/2019/05/01/aeternitys-first-on-chain-governance-vote-decentralization-2-0/">
          BRI
        </app-link>
        (Block Reward Initiative) gets 10,90% to fund activities of the
        <app-link
          variant="primary"
          to="https://aeternity.foundation/">
          Aeternity Foundation
        </app-link>
        .
      </template>
    </stats-tile>
    <stats-tile
      class="stats-panel__stats-tile"
      title="SUPPLY"
      icon-name="supply">
      <div>
        Burned:
        <price-label
          class="stats-panel__value"
          :price="burnedCount"
          :has-icon="false"/>
      </div>
      <div>
        Circulating:
        <price-label
          class="stats-panel__value"
          :price="totalTokenSupply"
          :has-icon="false"/>
      </div>
      <template #tooltip>
        Circulating supply is the distributed amount of Æ minus the burned amount of Æ. The protocol automatically burns
        all Æ which are used to claim ÆNS names. Account that holds the burned amount:
        <app-link to="/accounts/ak_11111111111111111111111111111111273Yts">
          ak_11111111111111111111111111111111273Yts
        </app-link>
      </template>
    </stats-tile>
    <stats-tile
      class="stats-panel__stats-tile"
      title="STATE CHANNELS"
      icon-name="state-channel">
      <div>
        Active: <span class="stats-panel__value">{{ formatNullable(formatNumber(stateChannelsCount)) }}</span>
      </div>
      <div>
        Locked:
        <price-label
          class="stats-panel__value"
          :price="stateChannelsLockedValue"
          :max-digits="2"
          :has-icon="false"/>
      </div>
      <template #tooltip>
        By utilizing
        <app-link
          variant="primary"
          to="https://aeternity.com/state-channels">
          State Channels
        </app-link>
        , users can execute a virtually unlimited number of transactions safely, at lightning speed & with instant
        finality while only paying the fee for two on-chain transactions to open and close the channel.
        The total locked value is the amount of AE that is currently used off-chain across all channels.
      </template>
    </stats-tile>
    <stats-tile
      class="stats-panel__stats-tile"
      title="SMART CONTRACTS"
      icon-name="contracts">
      <div>
        Total: <span class="stats-panel__value">{{ formatNullable(formatNumber(contractsCount)) }}</span>
      </div>
      <template #tooltip>
        æternity Smart Contracts are written in
        <app-link
          variant="primary"
          to="https://github.com/aeternity/aesophia">
          Sophia
        </app-link>
        - a strongly typed and functional programming language. Smart Contract execution is handled by the
        <app-link
          variant="primary"
          to="https://www.youtube.com/watch?v=ZbNTSEMCAvc">
          FATE VM
        </app-link>
        . The small bytecode size (10% of EVM smart contracts) translates into faster and cheaper execution by orders of
        magnitude.
      </template>
    </stats-tile>
    <stats-tile
      class="stats-panel__stats-tile"
      title="ORACLES"
      icon-name="oracles">
      <div>
        Active: <span class="stats-panel__value">{{ formatNullable(formatNumber(activeOraclesCount)) }}</span>
      </div>
      <div>
        Total seen: <span class="stats-panel__value">{{ formatNullable(formatNumber(oraclesCount)) }}</span>
      </div>
      <template #tooltip>
        Oracles are managed by special types of transactions. They can be programmed to request and provide data from
        information providers and APIs, empowering your blockchain apps with real world data.
      </template>
    </stats-tile>
    <stats-tile
      class="stats-panel__stats-tile"
      title="AENS NAMES"
      icon-name="aens-name">
      <div>
        In auction: <span class="stats-panel__value">{{ formatNullable(formatNumber(namesInAuctionCount)) }}</span>
      </div>
      <div>
        Active: <span class="stats-panel__value">{{ formatNullable(formatNumber(activeNamesCount)) }}</span>
      </div>
      <template #tooltip>
        Æternity Naming System (ÆNS) uses human-meaningful names instead of cryptic addresses for accounts, making
        blockchain technology more accessible, less prone to errors and user-friendly. Register your dot chain name
        today with the
        <br>
        <app-link
          variant="primary"
          to="https://wallet.superhero.com/">
          Superhero Wallet
        </app-link>
        .
      </template>
    </stats-tile>
  </app-panel>

  <loader-panel
    v-else
    class="stats-panel__loader-panel"/>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import AppLink from '@/components/AppLink'
import AppPanel from '@/components/AppPanel'
import StatsTile from '@/components/StatsTile'
import { formatNullable, formatNumber } from '@/utils/format'
import { useBlockchainStatsStore } from '@/stores/blockchainStats'
import { useRecentBlocksStore } from '@/stores/recentBlocks'

const {
  maxTps,
  transactionsCount,
  activeOraclesCount,
  oraclesCount,
  activeNamesCount,
  namesInAuctionCount,
  contractsCount,
  stateChannelsLockedValue,
  stateChannelsCount,
  burnedCount,
  totalTokenSupply,
} = storeToRefs(useBlockchainStatsStore())

const {
  blockHeight,
  latestKeyblockTransactionsCount,
  latestReward,
} = storeToRefs(useRecentBlocksStore())

const isLoading = computed(() => {
  return !(transactionsCount.value && latestReward.value)
})

</script>

<style scoped>
.stats-panel {
  display: grid;
  grid-template-columns:4fr;
  gap: var(--space-1);
  width: 100%;
  box-sizing: border-box;
  padding: var(--space-5) var(--space-1);

  @media (--desktop) {
    gap: var(--space-5) var(--space-3);
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 68px 1fr;
    padding: var(--space-6);
  }

  &__stats-tile {
    margin-bottom: var(--space-2);

    &:last-of-type {
      margin-bottom: 0;
    }

    @media (--desktop) {
      margin-bottom: 0;
    }
  }

  &__value {
    font-weight: 700;
  }

  &__loader-panel {
    height: 784px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-4);

    @media (--desktop) {
      /*hardcoded height to prevent content jumping*/
      height: 264px;
    }
  }
}
</style>
