<template>
  <app-select
    v-model="selectedEntity"
    size="sm"
    class="search-select"
    :options="entities"
    track-by="name"
    label="name"
    :hide-selected="true"
    :searchable="false"/>
</template>

<script setup>
import { ref } from 'vue'
import { useVModel } from '@vueuse/core'
import AppSelect from '@/components/AppSelect'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: Object,
    default: null,
  },
})

const selectedEntity = useVModel(props, 'modelValue', emit)
// todo defauls
const entities = ref([
  {
    name: 'All types',
    url: '',
  },
  {
    name: 'Transactions',
    url: 'transactions',
  },
  {
    name: 'Accounts',
    url: 'accounts',
  },
  {
    name: 'Names',
    url: 'names',
  },
  {
    name: 'Smart Contracts',
    url: 'contracts',
  },
  {
    name: 'Tokens',
    url: 'tokens',
  },
  {
    name: 'Oracles',
    url: 'oracles',
  },
  {
    name: 'State channels',
    url: 'state-channels',
  },
  {
    name: 'Keyblock id',
    url: 'keyblocks',
  },
  {
    name: 'Keyblock height',
    url: 'keyblocks',
  },
  {
    name: 'Microblock id',
    url: 'microblocks',
  },
])

</script>

<style scoped>
.search-select {
  width: 180px;
  min-height: 32px !important;
}
</style>
