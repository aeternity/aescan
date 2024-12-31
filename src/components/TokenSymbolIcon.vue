<template>
  <app-identicon
    :hash="contractId"/>
</template>
<script setup>
import { useRuntimeConfig } from 'nuxt/app'

const props = defineProps({
  contractId: {
    type: String,
    required: true,
  },
})
</script>
