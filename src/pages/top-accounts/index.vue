<template>
  <Head>
    <Title>Top Accounts</Title>
  </Head>

  <page-header>
    Top Accounts
    <!--todo hints-->
    <template #tooltip>
      {{ tokensHints.token }}
    </template>
  </page-header>
  <top-accounts-panel v-if="!isLoading"/>
  <loader-panel v-else/>
</template>

<script setup>
import PageHeader from '@/components/PageHeader'
import { tokensHints } from '@/utils/hints/tokensHints'

const { isLoading } = useLoading()
</script>
