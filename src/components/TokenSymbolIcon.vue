<template>
  <img
    v-if="isAe"
    alt="æ token"
    src="@/assets/ae-logo.svg">

  <app-identicon
    v-else
    :hash="contractId"/>
</template>

<script setup>
import { useRuntimeConfig } from 'nuxt/app'

const { AE_TOKEN_ID } = useRuntimeConfig().public

const props = defineProps({
  contractId: {
    type: String,
    required: true,
  },
})

const isAe = computed(() => props.contractId === AE_TOKEN_ID)
</script>
