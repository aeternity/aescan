<template>
  <Head>
    <Title>{{ APP_TITLE_SHORT }} | Search</Title>
  </Head>
  <page-header>
    Search
  </page-header>

  <app-tabs v-if="namesFound && tokensFound">
    <app-tab title="Names">
      <app-panel>
        <table>
          <tr>
            <th>
              Name
            </th>
            <th>Status</th>
          </tr>
          <tr
            v-for="name in namesFound.data"
            :key="name.payload.name">
            <td>
              <app-link :to="`/names/${name.payload.name}`">
                {{ name.payload.name }}
              </app-link>
            </td>
            <td>{{ parseStatus(name.payload) }}</td>
          </tr>
        </table>
      </app-panel>
    </app-tab>
    <app-tab title="Tokens">
      <app-panel>
        <table>
          <tr>
            <th>Symbol</th>
            <th>Name</th>
            <th>Smart Contract</th>
          </tr>
          <tr
            v-for="token in tokensFound.data"
            :key="token.contractId">
            <td>
              <app-link
                :to="`/tokens/${token.contractId}`">
                <token-symbol-icon
                  :contract-id="token.contractId"/>
                {{ token.symbol }}
              </app-link>
            </td>
            <td>{{ token.name }}</td>
            <td>{{ token.contractId }}</td>
            <!--            tokens icons-->
            <!--            todo pagination-->
          </tr>
        </table>
      </app-panel>
    </app-tab>
  </app-tabs>

  <app-panel>
    <template #heading>
      Accounts
    </template>
  </app-panel>
  <app-panel>
    <template #heading>
      Transactions
    </template>
  </app-panel>
  <app-panel>
    <template #heading>
      Smart Contracts
    </template>
  </app-panel>
  <app-panel>
    <template #heading>
      Oracles
    </template>
  </app-panel>
  <app-panel>
    <template #heading>
      State Channels
    </template>
  </app-panel>
</template>

<script setup>
import axios from 'axios'

import { useRoute, useRuntimeConfig } from '#app'
import PageHeader from '~/components/PageHeader'
import AppTabs from '~/components/AppTabs'
import AppTab from '~/components/AppTab'
import TokenSymbolIcon from '~/components/TokenSymbolIcon'
import AppLink from '~/components/AppLink'

const route = useRoute()
const { MIDDLEWARE_URL } = useRuntimeConfig().public

onMounted(() => {
  searchByName(route.params.id)
})

const namesFound = ref([])
const tokensFound = ref([])

function parseStatus(name) {
  if (name.auctionEnd) {
    return 'In Auction'
  } else if (name.active) {
    return 'Active'
  } else {
    return 'Expired'
  }
}

async function searchByName(name) {
  // todo promise
  const { data: namesdata } = await axios.get(`${MIDDLEWARE_URL}/v2/names/search?prefix=${name}`)
  const { data: tokensdata } = await axios.get(`${MIDDLEWARE_URL}/v2/aex9?limit=10&prefix=${name}`)
  namesFound.value = namesdata
  tokensFound.value = tokensdata
}

</script>
