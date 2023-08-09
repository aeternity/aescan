<template>
  <Head>
    <Title>{{ APP_TITLE_SHORT }} | Transactions</Title>
  </Head>

  <page-header>
    Transactions

    <template #tooltip>
      {{ transactionsHints.transaction }}
    </template>
  </page-header>

  <transactions-panel v-if="!isLoading"/>
  <loader-panel v-else/>
</template>

<script setup>
import TransactionsPanel from '@/components/TransactionsPanel'
import PageHeader from '@/components/PageHeader'
import { transactionsHints } from '@/utils/hints/transactionsHints'

const nuxtApp = useNuxtApp()
const isLoading = ref(true)
nuxtApp.hook('page:start', () => {
  isLoading.value = true
})
nuxtApp.hook('page:finish', () => {
  isLoading.value = false
})
</script>
