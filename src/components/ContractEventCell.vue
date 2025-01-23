<template>
  <div class="contract-event-cell">
    <Suspense>
      <component
        :is="contractEventCellComponent"
        :event="event"
        :contract-details="contractDetails"/>
      <template #fallback>
        Loading...
      </template>
    </Suspense>
  </div>
</template>

<script setup>
const props = defineProps({
  contractDetails: {
    type: Object,
    required: true,
  },
  event: {
    type: Object,
    required: true,
  },
})

const contractEventCellComponent = computed(() =>
  defineAsyncComponent(async() => {
    try {
      return await import(`@/components/ContractEventCell${props.event.eventName}.vue`)
    } catch {
      console.error(`Unknown event ${props.event.eventName} in contract ${props.contractDetails.id}`)
      return defineComponent(() => () => h('span', 'N/A'))
    }
  },
  ),
)
</script>

<style scoped>
.contract-event-cell {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: var(--space-1);
  flex-wrap: wrap;

  @media (--desktop) {
    justify-content: space-between;
  }
}
</style>
