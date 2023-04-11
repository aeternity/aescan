<template>
  <app-select
    v-model="selectedTokens"
    track-by="key"
    label="label"
    :options="tokensTypes"/>
</template>

<script setup>
import { useVModel } from '@vueuse/core'
import AppSelect from '~/components/AppSelect.vue'

const emit = defineEmits(['update:modelValue'])

const tokensTypes = [
  { label: 'Listed', key: 'listedTokens' },
  { label: 'All Tokens', key: 'allTokens' },
]

const props = defineProps({
  modelValue: {
    type: Object,
    default: null,
  },
})

const selectedTokens = useVModel(props, 'modelValue', emit)
</script>
