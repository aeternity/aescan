<template>
  <Head>
    <Title>Accounts</Title>
  </Head>

  <page-header>
    Top 100 Accounts
    <template #tooltip>
      {{ topAccountsHints.topAccounts }}
    </template>
  </page-header>
  <!--  todo accounts vs accounts-->
  <accounts-statistics/>
  <top-accounts-panel v-if="!isLoading"/>
  <loader-panel v-else/>
</template>

<script setup>
import PageHeader from '@/components/PageHeader'
import { topAccountsHints } from '@/utils/hints/topAccountsHints'
import AccountsStatistics from '~/components/AccountsStatistics.vue'

const { isLoading } = useLoading()
</script>
