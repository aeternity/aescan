<template>
  <Head>
    <Title>NFTs</Title>
  </Head>

  <page-header>
    NFTs
    <template #tooltip>
      {{ nftsHints.nft }}
    </template>
  </page-header>

  <nfts-panel v-if="!isLoading"/>
  <loader-panel v-else/>
</template>

<script setup>
import { nftsHints } from '@/utils/hints/nftsHints'

const { isLoading } = useLoading()
</script>
