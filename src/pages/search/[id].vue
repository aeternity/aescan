<template>
  <Head>
    <Title>{{ APP_TITLE_SHORT }} | Search Results</Title>
  </Head>

  <page-header>
    Search Results
  </page-header>

  <template v-if="!isLoading">
    <app-tabs>
      <app-tab title="Names">
        <search-names-panel class="search__panel"/>
      </app-tab>
      <app-tab title="Tokens">
        <search-tokens-panel class="search__panel"/>
      </app-tab>
    </app-tabs>

    <app-panel class="search__panel">
      <template #heading>
        ACCOUNTS
        <hint-tooltip>
          {{ accountHints.account }}
        </hint-tooltip>
      </template>
      <p class="search__paragraph">
        No Accounts were found with the string <span class="search__highlighted">ak_-*{{ query }}</span>.
      </p>
      <p class="search__paragraph">
        Please search using the complete <span class="search__highlighted">Account ID</span> to go directly to the
        result.
      </p>
      <p class="search__paragraph">
        Here are specific instructions as how to find it.
      </p>
    </app-panel>

    <app-panel class="search__panel">
      <template #heading>
        TRANSACTIONS
        <hint-tooltip>
          {{ transactionsHints.transaction }}
        </hint-tooltip>
      </template>
      <p class="search__paragraph">
        No Transactions were found with the string <span class="search__highlighted">th_-*{{ query }}</span>.
      </p>
      <p class="search__paragraph">
        Please search using the complete <span class="search__highlighted">Transaction Hash</span> to go directly to the
        result.
      </p>
      <p class="search__paragraph">
        Here are specific instructions as how to find it.
      </p>
    </app-panel>

    <app-panel class="search__panel">
      <template #heading>
        SMART CONTRACTS
        <hint-tooltip>
          {{ contractsHints.contract }}
        </hint-tooltip>
      </template>
      <p class="search__paragraph">
        No Smart Contracts were found with the string <span class="search__highlighted">th_-*{{ query }}</span>.
      </p>
      <p class="search__paragraph">
        Please search using the complete <span class="search__highlighted">Smart Contract ID</span> to go directly to
        the result.
      </p>
      <p class="search__paragraph">
        Here are specific instructions as how to find it.
      </p>
    </app-panel>

    <app-panel class="search__panel">
      <template #heading>
        ORACLES
        <hint-tooltip>
          {{ oraclesHints.oracle }}
        </hint-tooltip>
      </template>
      <p class="search__paragraph">
        No Oracles were found with the string <span class="search__highlighted">ok_-*{{ query }}</span>.
      </p>
      <p class="search__paragraph">
        Please search using the complete <span class="search__highlighted">Oracle ID</span> to go directly to the
        result.
      </p>
      <p class="search__paragraph">
        Here are specific instructions as how to find it.
      </p>
    </app-panel>

    <app-panel class="search__panel">
      <template #heading>
        STATE CHANNELS
        <hint-tooltip>
          {{ stateChannelsHints.stateChannel }}
        </hint-tooltip>
      </template>
      <p class="search__paragraph">
        No State Channels were found with the string <span class="search__highlighted">th_-*{{ query }}</span>.
      </p>
      <p class="search__paragraph">
        Please search using the complete <span class="search__highlighted">State Channel ID</span> to go directly to the
        result.
      </p>
      <p class="search__paragraph">
        Here are specific instructions as how to find it.
      </p>
    </app-panel>

    <app-panel class="search__panel">
      <template #heading>
        KEYBLOCKS
        <hint-tooltip>
          {{ keyblocksHints.keyblock }}
        </hint-tooltip>
      </template>
      <p class="search__paragraph">
        No Keyblocks were found with the string <span class="search__highlighted">kh_-*{{ query }}</span>.
      </p>
      <p class="search__paragraph">
        Please search using the complete <span class="search__highlighted">Keyblock ID</span> to go directly to the
        result.
      </p>
      <p class="search__paragraph">
        Here are specific instructions as how to find it.
      </p>
    </app-panel>

    <app-panel class="search__panel">
      <template #heading>
        MICROBLOCKS
        <hint-tooltip>
          {{ microblocksHints.microblock }}
        </hint-tooltip>
      </template>
      <p class="search__paragraph">
        No Microblocks were found with the string <span class="search__highlighted">mh_-*{{ query }}</span>.
      </p>
      <p class="search__paragraph">
        Please search using the complete <span class="search__highlighted">Microblocks ID</span> to go directly to the
        result.
      </p>
      <p class="search__paragraph">
        Here are specific instructions as how to find it.
      </p>
    </app-panel>

    <app-panel class="search__panel">
      <template #heading>
        COMMUNITY FEEDBACK
      </template>
      <p class="search__paragraph">
        Couldn’t find at all what you needed? Let us know.
      </p>
      <p class="search__paragraph">
        Ask for help in
        <app-link to="https://forum.aeternity.com">
          the Forum
        </app-link>
        or tell us your story in the
        <app-link to="https://aeternity.com/aescan-feedback-survey">
          Feedback Survey
        </app-link>
        .
      </p>
    </app-panel>
  </template>
  <loader-panel v-else/>
</template>

<script setup>
import { transactionsHints } from '@/utils/hints/transactionsHints'
import { contractsHints } from '@/utils/hints/contractsHints'
import { oraclesHints } from '@/utils/hints/oraclesHints'
import { stateChannelsHints } from '@/utils/hints/stateChannelsHints'
import { keyblocksHints } from '@/utils/hints/keyblocksHints'
import { microblocksHints } from '@/utils/hints/microblocksHints'
import PageHeader from '@/components/PageHeader'
import AppTabs from '@/components/AppTabs'
import AppTab from '@/components/AppTab'
import AppPanel from '@/components/AppPanel'
import { accountHints } from '@/utils/hints/accountHints'
import HintTooltip from '@/components/HintTooltip'

const { isLoading } = useLoading()
const route = useRoute()
const { id: query } = route.params

</script>

<style scoped>
.search {
  &__panel {
    margin-bottom: var(--space-4);
    @media (--desktop) {
      margin-bottom: var(--space-6);
    }
  }

  &__paragraph {
    margin-bottom: var(--space-4);
  }

  &__highlighted {
    font-weight: 700;
  }
}
</style>
