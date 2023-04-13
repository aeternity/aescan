<template>
  <img
    v-if="isAe"
    alt="æ token"
    src="@/assets/ae-token.svg"
    class="token-symbol-icon">
  <app-identicon
    v-else
    :id="contractId"
    class="token-symbol-icon"/>
</template>
<script setup>
import { useRuntimeConfig } from 'nuxt/app'

const config = useRuntimeConfig()

const props = defineProps({
  contractId: {
    type: String,
    required: true,
  },
})

const isAe = computed(() => props.contractId === config.public.AE_TOKEN_ID)
</script>
