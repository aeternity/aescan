<template>
  <app-select
    v-model="selectedVersion"
    :options="compilerOptions"
    track-by="key"
    label="value"
    placeholder="Select Compiler version"
    :hide-selected="true"/>
</template>

<script setup>
import { useVModel } from '@vueuse/core'

const { compilerOptions } = storeToRefs(useContractVerificationStore())

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const selectedVersion = useVModel(props, 'modelValue', emit)
</script>
