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
import { useRoute } from '#app'
import AppSelect from '@/components/AppSelect'

const route = useRoute()

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: Object,
    default: null,
  },
})

onMounted(() => {
  preselectedEntityName.value = route.path.split('/')[1] || ''
  selectedEntity.value = preselectedEntity.value
})

const selectedEntity = useVModel(props, 'modelValue', emit)

const preselectedEntity = computed(() => {
  return entities.value.find(entity => entity.url === preselectedEntityName.value)
})

const preselectedEntityName = ref(null)

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
  min-height: 32px;
}
</style>
