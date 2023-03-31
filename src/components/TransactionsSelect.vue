<template>
  <app-select
    v-model="selectedTxType"
    :options="txsTypes"
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

<script>
import AppSelect from '@/components/AppSelect'
import AppIcon from '@/components/AppIcon'
import { TX_TYPES_OPTIONS } from '@/utils/constants'

export default {
  name: 'TransactionsSelect',
  components: { AppIcon, AppSelect },
  props: {
    modelValue: undefined,
  },
  emits: ['update:modelValue'],
  data: () => ({
    txsTypes: TX_TYPES_OPTIONS,
  }),
  computed: {
    selectedTxType: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      },
    },
  },

  methods: {
    getIconName(option, selectedOption) {
      return option === selectedOption ? 'check-square' : 'square'
    },
  },
}
</script>

<style scoped>
.transactions-select__icon {
  margin-right: var(--space-1);
}
</style>
