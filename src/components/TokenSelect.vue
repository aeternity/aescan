<template>
  <app-select
    v-model="selectedTokens"
    track-by="val"
    label="label"
    :options="[
      {label:'Listed', val: 'listedTokens'},
      {label:'Unlisted', val: 'unlistedTokens'}
    ]"/>
</template>

<script>
export default {
  name: 'TokenSelect',
  emits: ['update:modelValue'],
  computed: {
    selectedTokens: {
      // todo simplify and convert to composition
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      },
    },
  },
}
</script>
