<template>
  <div>
    <scope-picker
      :scope="formattedScope"
      :is-scope-selected="isScopeSelected"
      placeholder="All Time"
      :clearable="true"
      @updated="selectScope"/>
  </div>
</template>

<script setup>
import { useVModel } from '@vueuse/core'
import { computed } from 'vue'
import { useTransactionsStore } from '~/stores/transactions'

const transactionsStore = useTransactionsStore()

const {
  formatStoreObjectToDatePickerObject,
  formatPickerObjectToStoreObject,
} = transactionsStore

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
})

const model = useVModel(props, 'modelValue', null)

const isScopeSelected = computed(() => {
  return !!model.value
})

function selectScope(interval) {
  // model.value = formatB(interval)
  model.value = formatPickerObjectToStoreObject(interval)
}

const formattedScope = computed(() => formatStoreObjectToDatePickerObject(model.value))
</script>
