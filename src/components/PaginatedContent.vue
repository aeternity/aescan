<template>
  <div
    ref="paginatedContent"
    class="paginated-content">
    <template v-if="entities">
      <header
        v-if="hasCounter || hasLimitSelector || $slots.header"
        class="paginated-content__header">
        <div class="paginated-content__counter">
          <span v-if="hasCounter">
            <template v-if="effectiveTotalCount > 0">
              Displaying
              <span class="paginated-content__highlighted">
                {{ formatNullable(firstVisibleIndex) }}-{{ formatNullable(lastVisibleIndex) }}
                of
                {{ formatNullable(effectiveTotalCount) }}
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
          v-if="hasLimitSelector"
          class="paginated-content__per-page">
          <span class="paginated-content__per-page-label">per page:</span>
          <button
            v-for="option in PAGINATION_LIMIT_OPTIONS"
            :key="option"
            class="paginated-content__per-page-option"
            :class="{'paginated-content__per-page-option--active': limitModel === option}"
            @click="setLimit(option)">
            {{ option }}
          </button>
        </div>
        <div
          v-if="$slots.header"
          class="paginated-content__slot-header">
          <slot name="header"/>
        </div>
      </header>
      <div
        v-if="!!entities?.data?.length"
        class="paginated-content__container">
        <slot/>
      </div>
      <blank-state
        v-else
        class="paginated-content__blank-state"/>

      <div
        v-if="hasPagination"
        class="paginated-content__footer">
        <app-pagination
          class="paginated-content__pagination"
          :is-prev-disabled="isPrevDisabled"
          :is-next-disabled="isNextDisabled"
          :prev-label="prevLabel"
          :next-label="nextLabel"
          @prev-clicked="handlePrevClicked"
          @next-clicked="handleNextClicked"/>
      </div>
    </template>
    <div v-else>
      <loader-indicator class="paginated-content__loader-indicator"/>
    </div>
  </div>
</template>

<script setup>
import { useVModel } from '@vueuse/core'
import { PAGINATION_LIMIT, PAGINATION_LIMIT_OPTIONS } from '@/utils/constants'

const props = defineProps({
  entities: {
    type: [Object, null],
    default: null,
  },
  pageIndex: {
    type: [Number, null],
    default: null,
  },
  limit: {
    type: Number,
    default: PAGINATION_LIMIT,
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
  'update:limit',
])
const pageIndex = props.pageIndex ? useVModel(props, 'pageIndex', emit) : ref(1)
const limitModel = useVModel(props, 'limit', emit)
const firstVisibleIndex = computed(
  () => (pageIndex.value - 1) * limitModel.value + 1,
)
const lastVisibleIndex = computed(
  () => firstVisibleIndex.value + (props.entities?.data?.length ?? 0) - 1,
)
const effectiveTotalCount = computed(() => {
  if (props.totalCount === null) return null
  return Math.max(props.totalCount, lastVisibleIndex.value)
})

const isPrevDisabled = computed(() => !props.entities.prev || pageIndex.value === 1)
const isNextDisabled = computed(() => !props.entities.next)
const hasPagination = computed(() => !!props.entities.data.length && (props.entities.prev || props.entities.next))
const hasCounter = computed(() => effectiveTotalCount.value !== null && effectiveTotalCount.value > 0)
const hasLimitSelector = computed(() => !!props.entities?.data?.length)
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

function setLimit(option) {
  if (limitModel.value !== option) {
    limitModel.value = option
    pageIndex.value = 1
  }
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
  if (paginatedContent.value) {
    paginatedContent.value.style.height = ''
  }
}

const paginatedContent = ref()

onMounted(() => {
  window.addEventListener('resize', resetContainerHeight)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resetContainerHeight)
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
    flex: 1;
  }

  &__footer {
    display: flex;
    width: 100%;
    margin-top: var(--space-2);
  }

  &__per-page {
    display: flex;
    align-items: center;
    gap: var(--space-1);
    flex-wrap: wrap;
  }

  &__per-page-label {
    font-family: var(--font-monospaced);
    font-size: 12px;
    color: var(--color-midnight-35);
    white-space: nowrap;
  }

  &__per-page-option {
    font-family: var(--font-monospaced);
    font-size: 12px;
    padding: 2px 8px;
    border: 1px solid var(--color-midnight-25);
    border-radius: 4px;
    background: transparent;
    color: var(--color-midnight-35);
    cursor: pointer;
    line-height: 1.5;

    &:hover {
      border-color: var(--color-fire);
      color: var(--color-fire);
    }

    &--active {
      border-color: var(--color-fire);
      color: var(--color-fire);
      font-weight: 700;
    }
  }

  &__blank-state {
    width: 100%;
  }
}
</style>
