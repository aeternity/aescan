<template>
  <app-select
    v-model="selectedTokens"
    track-by="key"
    label="label"
    preselect-first
    :options="tokensTypes"/>
</template>

<script setup>
import { useVModel } from '@vueuse/core'
import AppSelect from '~/components/AppSelect.vue'
import { TOKEN_TYPES_OPTIONS } from '~/utils/constants'

const emit = defineEmits(['update:modelValue'])

const tokensTypes = TOKEN_TYPES_OPTIONS

const props = defineProps({
  modelValue: {
    type: Object,
    default: null,
  },
})

const selectedTokens = useVModel(props, 'modelValue', emit)
</script>
