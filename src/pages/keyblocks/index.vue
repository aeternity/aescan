<template>
  <Head>
    <Title>Keyblocks</Title>
  </Head>

  <page-header>
    Smart Contracts
    <template #tooltip>
      {{ keyblocksHints.contract }}
      <!--      <app-link-->
      <!--        variant="primary"-->
      <!--        to="https://docs.aeternity.com/protocol/contracts/">-->
      <!--        Learn more-->
      <!--      </app-link>-->
    </template>
  </page-header>

  <keyblock-panel v-if="!isLoading"/>
  <loader-panel v-else/>
</template>

<script setup>
import ContractsPanel from '@/components/ContractsPanel'
import PageHeader from '@/components/PageHeader'
import { contractsHints } from '@/utils/hints/contractsHints'
import { CHART_INTERVALS_OPTIONS } from '@/utils/constants'
import { keyblocksHints } from "~/utils/hints/keyblocksHints";

const { isLoading } = useLoading()
</script>

<style scoped>
.contracts-panel {
  margin-bottom: var(--space-4);

  @media (--desktop) {
    margin-bottom: var(--space-6);
  }

  &:last-child {
    margin-bottom: 0;
  }
}
</style>
