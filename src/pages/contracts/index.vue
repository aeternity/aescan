<template>
  <Head>
    <Title>{{ APP_TITLE_SHORT }} | Smart Contracts</Title>
  </Head>

  <page-header>
    Smart Contracts
  </page-header>

  <contracts-panel class="contracts__panel"/>
</template>

<script setup>
import ContractsPanel from '@/components/ContractsPanel'
import PageHeader from '@/components/PageHeader'
</script>
