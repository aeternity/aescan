<template>
  <app-select
    v-model="selectedTxType"
    :options="TX_TYPES_OPTIONS"
    track-by="typeQuery"
    label="label"
    placeholder="Select Tx Type"
    :size="size"
    :hide-selected="true"/>
</template>

<script setup>
import { useVModel } from '@vueuse/core'
import { TX_TYPES_OPTIONS } from '@/utils/constants'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
  size: {
    type: String,
    default: null,
  },
})

const emit = defineEmits(['update:modelValue'])

const selectedTxType = useVModel(props, 'modelValue', emit)
</script>
