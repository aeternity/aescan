<template>
  <Head>
    <Title>Nodes</Title>
  </Head>

  <page-header>
    Nodes

    <template #tooltip>
      aaa
    </template>
  </page-header>
  <nodes-panel v-if="!isLoading"/>
  <loader-panel v-else/>
</template>

<script setup>

const { isLoading } = useLoading()
</script>
