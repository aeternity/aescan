<template>
  <Head>
    <Title>Transactions</Title>
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

const { isLoading } = useLoading()
</script>
