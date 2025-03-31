<template>
  <div
    ref="paginatedContent"
    class="paginated-content">
    <template v-if="entities">
      <header
        v-if="hasCounter || $slots.header"
        class="paginated-content__header">
        <div class="paginated-content__counter">
          <span v-if="hasCounter">
            <template v-if="totalCount > 0">
              Displaying
              <span class="paginated-content__highlighted">
                {{ formatNullable(firstVisibleIndex) }}-{{ formatNullable(lastVisibleIndex) }}
                of
                <number-label
                  class="paginated-content__number-label"
                  :number="totalCount"
                  is-raw/>
              </span>
              records
            </template>
            <template v-else>
              Displaying
              <span class="paginated-content__highlighted">0</span>
              records
            </template>
          </span>
        </div>
        <div
          v-if="$slots.header"
          class="paginated-content__slot-header">
          <slot name="header"/>
        </div>
      </header>
      <div
        v-if="!!entities?.data.length"
        class="paginated-content__container">
        <slot/>
      </div>
      <blank-state
        v-else
        class="paginated-content__blank-state"/>

      <app-pagination
        v-if="hasPagination"
        class="paginated-content__pagination"
        :is-prev-disabled="isPrevDisabled"
        :is-next-disabled="isNextDisabled"
        :prev-label="prevLabel"
        :next-label="nextLabel"
        @prev-clicked="handlePrevClicked"
        @next-clicked="handleNextClicked"/>
    </template>
    <div v-else>
      <loader-indicator class="paginated-content__loader-indicator"/>
    </div>
  </div>
</template>

<script setup>
import { useVModel } from '@vueuse/core'
import { PAGINATION_LIMIT } from '@/utils/constants'

const props = defineProps({
  entities: {
    type: [Object, null],
    default: null,
  },
  pageIndex: {
    type: [Number, null],
    default: null,
  },
  totalCount: {
    type: [Number, null],
    default: null,
  },
  paginationStyle: {
    type: String,
    default: 'order',
    validator(value) {
      return ['history', 'order'].includes(value)
    },
  },
})
const emit = defineEmits([
  'prev-clicked',
  'next-clicked',
  'update:pageIndex',
])
const pageIndex = props.pageIndex ? useVModel(props, 'pageIndex', emit) : ref(1)
const firstVisibleIndex = computed(
  () => (pageIndex.value - 1) * PAGINATION_LIMIT + 1,
)
const lastVisibleIndex = computed(
  () => firstVisibleIndex.value + props.entities?.data.length - 1,
)

const isPrevDisabled = computed(() => !props.entities.prev || pageIndex.value === 1)
const isNextDisabled = computed(() => !props.entities.next)
const hasPagination = computed(() => !!props.entities.data.length && (props.entities.prev || props.entities.next))
const hasCounter = computed(() => props.totalCount !== null && props.totalCount > 0)
const prevLabel = computed(() => {
  if (props.paginationStyle === 'history') {
    return 'Newer'
  }

  return 'Previous'
})

const nextLabel = computed(() => {
  if (props.paginationStyle === 'history') {
    return 'Older'
  }

  return 'Next'
})

function handlePrevClicked() {
  setFixedContainerHeight()
  pageIndex.value--
  emit('prev-clicked')
}

function handleNextClicked() {
  setFixedContainerHeight()
  pageIndex.value++
  emit('next-clicked')
}

watch(
  () => props.entities,
  () => {
    if (props.entities) {
      // reset container height after new data is loaded
      resetContainerHeight()
    }
  },
)

function setFixedContainerHeight() {
  paginatedContent.value.style.height = `${paginatedContent.value.clientHeight}px`
}

function resetContainerHeight() {
  paginatedContent.value.style.height = ''
}

const paginatedContent = ref()

onMounted(() => {
  window.addEventListener('resize', resetContainerHeight())
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resetContainerHeight())
})
</script>

<style scoped>
.paginated-content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  &__header {
    padding: var(--space-1);
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;

    @media (--desktop) {
      padding: var(--space-1) 0;
      justify-content: space-between;
      flex-direction: row;
      align-items: center;
    }

    &:empty {
      display: none;
    }
  }

  &__number-label {
    display: inline;
  }

  &__container {
    width: 100%;
    overflow-x: auto;
  }

  &__slot-header {
    margin-top: var(--space-3);
    width: 100%;

    @media (--desktop) {
      margin-top: 0;
      width: auto;
    }
  }

  &__counter {
    font-family: var(--font-monospaced);

    @media (--desktop) {
      margin-bottom: 0;
    }
  }

  &__highlighted {
    font-weight: 700;
  }

  &__loader-indicator {
    margin: var(--space-3) 0;
  }

  &__pagination {
    width: 100%;
  }

  &__blank-state {
    width: 100%;
  }
}
</style>
