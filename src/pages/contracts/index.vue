<template>
  <Head>
    <Title>{{ APP_TITLE_SHORT }} | Smart Contracts</Title>
  </Head>

  <page-header>
    Smart Contracts

    <template #tooltip>
      {{ contractsHints.contract }}
    </template>
  </page-header>

  <contracts-panel/>
</template>

<script setup>
import ContractsPanel from '@/components/ContractsPanel'
import PageHeader from '@/components/PageHeader'
import { contractsHints } from '@/utils/hints/contractsHints'
</script>
