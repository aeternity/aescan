<template>
  <transaction-cell
    v-if="activity.payload.tx"
    :transaction-type="activity.payload.tx.type"
    :transaction-data="activity.payload.tx"/>
  <div
    v-else
    class="account-activity-data-cell">
    <Suspense>
      <component
        :is="dataCellComponent"
        :activity="activity"/>
      <template #fallback>
        Loading...
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'

const props = defineProps({
  activity: {
    type: Object,
    required: true,
  },
})

const dataCellComponent = computed(() =>
  defineAsyncComponent(async() => {
    try {
      return await import(`@/components/AccountActivityDataCell${props.activity.type}.vue`)
    } catch {
      console.error(`Unknown account activity data cell ${props.activity.type}`)
      return defineComponent(() => () => h('span', 'N/A'))
    }
  },
  ),
)
</script>

<style scoped>
.account-activity-data-cell {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: var(--space-1);
  flex-wrap: wrap;

  @media(--desktop) {
    justify-content: space-between;
  }
}
</style>
