<template>
  <div>
    <scope-picker
      :scope="model"
      :is-scope-selected="isScopeSelected"
      placeholder="All Time"
      :clearable="true"
      type="t"
      @updated="selectScope"/>
  </div>
</template>

<script setup>
import { useVModel } from '@vueuse/core'
import { computed } from 'vue'

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
  model.value = interval
  // todo usemodel
}

</script>
