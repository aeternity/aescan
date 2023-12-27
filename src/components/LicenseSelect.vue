<template>
  <app-select
      v-model="selectedLicense"
      :options="LICENSE_TYPE_OPTIONS"
      track-by="key"
      label="label"
      placeholder="Select Compiler Version"
      :hide-selected="true"/>
</template>

<script setup>
import { useVModel } from '@vueuse/core'
import AppSelect from '@/components/AppSelect'
import { LICENSE_TYPE_OPTIONS } from '@/utils/constants'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const selectedLicense = useVModel(props, 'modelValue', emit)
</script>
