<template>
  <app-select
    v-model="selectedLicense"
    :options="LICENSE_OPTIONS"
    track-by="key"
    label="label"
    placeholder="Select License"
    :hide-selected="true"/>
</template>

<script setup>
import { useVModel } from '@vueuse/core'
import { LICENSE_OPTIONS } from '@/utils/constants'

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const selectedLicense = useVModel(props, 'modelValue', emit)
</script>
