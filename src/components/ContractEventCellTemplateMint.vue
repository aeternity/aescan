<template>
  <value-hash-ellipsed
    :hash="eventData[0]"
    :link-to="`/accounts/${eventData[0]}`"/>

  <transaction-arrow-right-icon/>

  {{ eventData[1] }}

  <app-chip size="sm">
    {{ eventData[2] }}
  </app-chip>
</template>

<script setup>
const props = defineProps({
  contractDetails: {
    required: true,
    type: Object,
  },
  event: {
    required: true,
    type: Object,
  },
})

const eventData = computed(() => props.event.data)
</script>
