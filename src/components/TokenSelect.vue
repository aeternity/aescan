<template>
  <app-select
    v-model="selectedTokens"
    track-by="key"
    label="label"
    :options="tokensTypes"/>
</template>

<script setup>
const emit = defineEmits(['update:modelValue'])

const tokensTypes = [
  { label: 'Listed', key: 'listedTokens' },
  { label: 'Unlisted', key: 'unlistedTokens' },
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
