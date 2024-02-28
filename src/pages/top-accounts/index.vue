<template>
  <Head>
    <Title>Top Accounts</Title>
  </Head>

  <page-header>
    Top Accounts
    <template #tooltip>
      {{ topAccountsHints.topAccounts }}
    </template>
  </page-header>
  <top-accounts-panel v-if="!isLoading"/>
  <loader-panel v-else/>
</template>

<script setup>
import PageHeader from '@/components/PageHeader'
import { topAccountsHints } from '~/utils/hints/topAccountsHints'

const { isLoading } = useLoading()
</script>
