<template>
  <Head>
    <Title>{{ APP_TITLE_SHORT }} | Transactions</Title>
  </Head>

  <page-header>
    Transactions
  </page-header>

  <transactions-panel/>
</template>

<script>
import TransactionsPanel from '@/components/TransactionsPanel'
import PageHeader from '@/components/PageHeader'

export default {
  name: 'TransactionsView',
  components: { PageHeader, TransactionsPanel },
}
</script>
