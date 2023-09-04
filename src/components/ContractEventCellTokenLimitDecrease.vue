<template>
  {{ eventData[0] }}

  <transaction-arrow-right-icon/>

  {{ eventData[1] }}
</template>

<script setup>
import TransactionArrowRightIcon from '@/components/TransactionArrowRightIcon'

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
