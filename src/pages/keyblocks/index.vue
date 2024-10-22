<template>
  <Head>
    <Title>Keyblocks</Title>
  </Head>

  <page-header>
    Keyblocks
    <template #tooltip>
      {{ keyblocksHints.keyblock }}
    </template>
  </page-header>

  <keyblocks-panel v-if="!isLoading"/>
  <loader-panel v-else/>
</template>

<script setup>
import { keyblocksHints } from "@/utils/hints/keyblocksHints";

const { isLoading } = useLoading()
</script>
