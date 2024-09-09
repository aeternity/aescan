<template>
  <Head>
    <Title>Miners</Title>
  </Head>

  <page-header>
    Miners
    <template #tooltip>
      <!--      todo hints-->
      {{ topAccountsHints.topAccounts }}
    </template>
  </page-header>
  <miners-panel v-if="!isLoading"/>
  <loader-panel v-else/>
</template>

<script setup>
import PageHeader from '~/components/PageHeader.vue'
import { topAccountsHints } from '~/utils/hints/topAccountsHints'

const { isLoading } = useLoading()
</script>
