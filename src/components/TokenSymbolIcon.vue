<template>
  <img
    v-if="isAe"
    alt="æ token"
    src="@/assets/ae-token.svg">

  <img
    v-else-if="isLaex"
    alt="LAEX token"
    src="@/assets/laex-token.svg">

  <app-identicon
    v-else
    :id="contractId"/>
</template>
<script setup>
import { useRuntimeConfig } from 'nuxt/app'
import { LAEX_CONTRACT_ID } from '@/utils/constants'

const config = useRuntimeConfig()

const props = defineProps({
  contractId: {
    type: String,
    required: true,
  },
})

const isAe = computed(() => props.contractId === config.public.AE_TOKEN_ID)

const isLaex = computed(() => props.contractId === LAEX_CONTRACT_ID)
</script>
