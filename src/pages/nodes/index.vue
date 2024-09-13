<template>
  <Head>
    <Title>Nodes</Title>
  </Head>

  <page-header>
    Nodes

    <template #tooltip>
      {{ nodesHints.nodes }}
    </template>
  </page-header>
  <nodes-panel v-if="!isLoading"/>
  <loader-panel v-else/>
</template>

<script setup>
import { nodesHints } from '@/utils/hints/nodesHints'

const { isLoading } = useLoading()
</script>
