<template>
  <app-select
    v-model="selectedOracleState"
    :options="ORACLE_STATES_OPTIONS"
    track-by="stateQuery"
    label="label"
    placeholder="Select Oracle State"
    :searchable="false"
    :hide-selected="true"/>
</template>

<script setup>
import { useVModel } from '@vueuse/core'
import AppSelect from '@/components/AppSelect'
import { ORACLE_STATES_OPTIONS } from '@/utils/constants'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const selectedOracleState = useVModel(props, 'modelValue', emit)
</script>
