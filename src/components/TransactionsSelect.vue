<template>
  <app-select
    v-model="selectedTxType"
    :options="TX_TYPES_OPTIONS"
    track-by="typeQuery"
    label="label"
    placeholder="Select Tx Type">
    <template #option="{ option: txType }">
      <app-icon
        v-if="selectedTxType"
        class="transactions-select__icon"
        :name="getIconName(txType.label, selectedTxType.label)"/>
      {{ txType.label }}
    </template>
  </app-select>
</template>

<script setup>
import { useVModel } from '@vueuse/core'
import AppSelect from '@/components/AppSelect'
import AppIcon from '@/components/AppIcon'
import { TX_TYPES_OPTIONS } from '@/utils/constants'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
})
const emit = defineEmits(['update:modelValue'])

const selectedTxType = useVModel(props, 'modelValue', emit)

function getIconName(option, selectedOption) {
  return option === selectedOption ? 'check-square' : 'square'
}
</script>

<style scoped>
.transactions-select__icon {
  margin-right: var(--space-1);
}
</style>
