<template>
  <Head>
    <Title>{{ APP_TITLE_SHORT }} | Search</Title>
  </Head>
  <page-header>
    Search
  </page-header>
  <br>
  <br>
  a{{ namesFound }}
  <br>
  <br>
  b{{ tokensFound }}
  <br><br>
  <app-tabs v-if="namesFound && tokensFound">
    <app-tab title="Names">
      <app-panel>
        <paginated-content
          :entities="namesFound"
          :limit="limit"
          pagination-style="history"
          @prev-clicked="loadPrevNamesFound"
          @next-clicked="loadNextNamesFound">
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
        </paginated-content>
      </app-panel>
    </app-tab>
    <app-tab title="Tokens">
      <app-panel>
        <paginated-content
          :entities="tokensFound"
          :limit="limit"
          pagination-style="history"
          @prev-clicked="loadPrevTokensFound"
          @next-clicked="loadNextTokensFound">
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
              <!--            todo hints-->
              <!--            loading-->
            </tr>
          </table>
        </paginated-content>
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
import { useRoute, useRuntimeConfig } from '#app'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import PageHeader from '~/components/PageHeader'
import AppTabs from '~/components/AppTabs'
import AppTab from '~/components/AppTab'
import TokenSymbolIcon from '~/components/TokenSymbolIcon'
import AppLink from '~/components/AppLink'
import AppPanel from '~/components/AppPanel'
import PaginatedContent from '~/components/PaginatedContent'
import { isDesktop } from '~/utils/screen'
import { useSearchStore } from '~/stores/search'

const searchStore = useSearchStore()
const { namesFound, tokensFound } = storeToRefs(searchStore)
const { fetchTokenSearch, fetchNamesSearch } = searchStore

const limit = computed(() => process.client && isDesktop() ? 10 : 3)

const route = useRoute()

onMounted(() => {
  fetchTokenSearch({ query: route.params.id, limit: limit.value })
  fetchNamesSearch({ query: route.params.id, limit: limit.value })
})

function parseStatus(name) {
  if (name.auctionEnd) {
    return 'In Auction'
  } else if (name.active) {
    return 'Active'
  } else {
    return 'Expired'
  }
}

async function loadPrevTokensFound() {
  await fetchTokenSearch({ queryParameters: tokensFound.value.prev })
}

async function loadNextTokensFound() {
  await fetchTokenSearch({ queryParameters: tokensFound.value.next })
}

async function loadPrevNamesFound() {
  await fetchNamesSearch({ queryParameters: namesFound.value.prev })
}

async function loadNextNamesFound() {
  await fetchNamesSearch({ queryParameters: namesFound.value.next })
}

</script>
