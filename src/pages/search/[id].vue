<template>
  <Head>
    <Title>{{ APP_TITLE_SHORT }} | Search</Title>
  </Head>
  <page-header>
    Search
  </page-header>

  <app-panel
    v-if="namesFound && tokensFound"
    class="">
    <app-tabs>
      <app-tab title="Names">
        <table>
          <tr>
            <th>Name</th>
            <th>Status</th>
          </tr>
          <tr
            v-for="name in namesFound.data"
            :key="name.payload.name">
            <td>{{ name.payload.name }}</td>
            <td>{{ parseStatus(name.payload) }}</td>
          </tr>
        </table>
      </app-tab>
      <app-tab title="Tokens">
        <table>
          <tr>
            <th>Symbol</th>
            <th>Name</th>
            <th>Smart Contract</th>
          </tr>
          <tr
            v-for="token in tokensFound.data"
            :key="token.contractId">
            <td>{{ token.symbol }}</td>
            <td>{{ token.name }}</td>
            <td>{{ token.contractId }}</td>
          </tr>
        </table>
      </app-tab>
    </app-tabs>
  </app-panel>
</template>

<script setup>
import axios from 'axios'

import { useRoute, useRuntimeConfig } from '#app'
import PageHeader from '~/components/PageHeader'
import AppTabs from '~/components/AppTabs'
import AppTab from '~/components/AppTab'

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
  console.log('tokensdata', tokensdata)
  namesFound.value = namesdata
  tokensFound.value = tokensdata
}

</script>
