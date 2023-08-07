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
                {{ formatNullable(totalCount) }}
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
        <slot name="header"/>
      </header>
      <div
        v-if="!!entities?.data.length"
        class="paginated-content__container">
        <slot/>
      </div>
    <blank-state v-else/>

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
      <spinner-loader class="paginated-content__spinner-loader"/>
    </div>
  </div>
</template>

<script setup>
import { useVModel } from '@vueuse/core'
import { computed, ref } from 'vue'
import AppPagination from '@/components/AppPagination'
import { formatNullable } from '@/utils/format'
import BlankState from '@/components/BlankState'

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
    default: 10,
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
  () => (pageIndex.value - 1) * props.limit + 1,
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

const handlePrevClicked = () => {
  setFixedContainerHeight()
  pageIndex.value--
  emit('prev-clicked')
}

const handleNextClicked = () => {
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
    padding: 8px 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;

    @media (--desktop) {
      justify-content: space-between;
      flex-direction: row;
      margin-bottom: var(--space-1);
    }

    &:empty {
      display: none;
    }
  }

  &__container {
    width: 100%;
  }

  &__counter {
    margin-bottom: var(--space-3);
    font-family: var(--font-monospaced);
    text-align: center;
    @media (--desktop) {
      margin-bottom: 0;
      text-align: left;
    }
  }

  &__highlighted {
    font-weight: 700;
  }

  &__blank-state {
    margin-top: var(--space-3);
    width: 100%;
  }

  &__spinner-loader {
    margin: var(--space-3) 0;
  }

  &__pagination {
    width: 100%;
  }
}
</style>
