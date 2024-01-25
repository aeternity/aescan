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
import { storeToRefs } from 'pinia'
import AppSelect from '@/components/AppSelect'

import { useContractVerificationStore } from '@/stores/contractVerification'

const verificationStore = useContractVerificationStore()
const { compilerOptions } = storeToRefs(verificationStore)

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const selectedVersion = useVModel(props, 'modelValue', emit)
</script>
