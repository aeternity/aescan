<template>
  <app-select
    v-model="selectedTxType"
    :options="TX_TYPES_OPTIONS"
    track-by="typeQuery"
    label="label"
    placeholder="Select Tx Type"/>
</template>

<script setup>
import { useVModel } from '@vueuse/core'
import AppSelect from '@/components/AppSelect'
import { TX_TYPES_OPTIONS } from '@/utils/constants'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const selectedTxType = useVModel(props, 'modelValue', emit)
</script>
