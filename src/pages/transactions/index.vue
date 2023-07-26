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

  <transactions-panel/>
</template>

<script setup>
import TransactionsPanel from '@/components/TransactionsPanel'
import PageHeader from '@/components/PageHeader'
import { transactionsHints } from '@/utils/hints/transactionsHints'
</script>
