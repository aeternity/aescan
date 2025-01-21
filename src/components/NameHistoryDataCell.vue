<template>
  <div class="name-history-data-cell">
    <Suspense>
      <component
        :is="dataCellComponent"
        :payload="payload"/>
      <template #fallback>
        Loading...
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'

const props = defineProps({
  payload: {
    type: Object,
    required: true,
  },
  activity: {
    type: Object,
    required: true,
  },
})

const dataCellComponent = computed(() =>
  defineAsyncComponent(async() => {
    try {
      return await import(`@/components/NameHistoryDataCell${props.activity}.vue`)
    } catch {
      console.error(`Unknown name history data cell ${props.activity}`)
      return defineComponent(() => () => h('span', 'N/A'))
    }
  }),
)
</script>

<style scoped>
.name-history-data-cell {
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
