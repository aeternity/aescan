<template>
  <app-select
    v-model="selectedTokens"
    track-by="key"
    label="label"
    :options="tokensTypes"/>
</template>

<script setup>
import AppSelect from '~/components/AppSelect.vue'
// todo check imports

const emit = defineEmits(['update:modelValue'])

const tokensTypes = [
  { label: 'Listed', key: 'listedTokens' },
  { label: 'All Tokens', key: 'allTokens' },
]

const selectedTokens = computed({
  get() {
    return this.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

</script>
