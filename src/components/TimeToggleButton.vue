<template>
  <app-button
    class="time-toggle-button"
    variant="link"
    @click="toggleTimeFormat">
    <slot/>
    {{ suffix }}
  </app-button>
</template>

<script setup>
const { toggleTimeFormat } = useUiStore()
const { timeFormat } = storeToRefs(useUiStore())

const suffix = computed(() => {
  return timeFormat.value === 'relative' ? 'Age' : 'Time'
})
</script>

<style setup>
.time-toggle-button {
  display: contents !important;

  /* Inherit the surrounding header / label typography so age toggles match sibling columns */
  font: inherit !important;
  letter-spacing: inherit !important;
  text-transform: inherit !important;
  color: inherit !important;
}
</style>
