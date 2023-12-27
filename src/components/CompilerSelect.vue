<template>
  <app-select
    v-model="selectedVersion"
    :options="COMPILER_VERSION_OPTIONS"
    track-by="key"
    label="label"
    placeholder="Select Compiler Version"
    :hide-selected="true"/>
</template>

<script setup>
import { useVModel } from '@vueuse/core'
import AppSelect from '@/components/AppSelect'
import { COMPILER_VERSION_OPTIONS } from '@/utils/constants'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const selectedVersion = useVModel(props, 'modelValue', emit)
</script>
