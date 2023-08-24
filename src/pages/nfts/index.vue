<template>
  <Head>
    <Title>{{ APP_TITLE_SHORT }} | NFTs</Title>
  </Head>

  <page-header>
    NFTs

    <template #tooltip>
      <!--      tod hints-->
    </template>
  </page-header>

  <nfts-panel v-if="!isLoading"/>
  <loader-panel v-else/>
</template>

<script setup>

const { isLoading } = useLoading()
</script>
