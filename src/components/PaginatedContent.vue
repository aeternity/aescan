<template>
  <div
    v-if="entities"
    ref="paginatedContent"
    class="paginated-content">
    <header class="paginated-content__header">
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
    <slot v-if="!!entities?.data.length"/>
    <blank-state
      v-else
      class="paginated-content__blank-state"/>

    <app-pagination
      v-if="hasPagination"
      :is-prev-disabled="isPrevDisabled"
      :is-next-disabled="isNextDisabled"
      :prev-label="prevLabel"
      :next-label="nextLabel"
      @prev-clicked="handlePrevClicked"
      @next-clicked="handleNextClicked"/>
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
  'update:page-index',
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
  pageIndex.value--
  emit('prev-clicked')
  scrollToPaginatedContent()
}

const handleNextClicked = () => {
  pageIndex.value++
  emit('next-clicked')
  scrollToPaginatedContent()
}

const paginatedContent = ref()

function scrollToPaginatedContent() {
  paginatedContent.value.scrollIntoView()
}
</script>

<style scoped>
.paginated-content {
  &__header {
    display: flex;
    align-items: center;
    flex-direction: column;

    @media (--desktop) {
      justify-content: space-between;
      flex-direction: row;
      margin-bottom: var(--space-1);
    }

    &:empty {
      display: none;
    }
  }

  &__counter {
    margin-bottom: var(--space-3);
    letter-spacing: -0.005em;
    font-family: var(--font-monospaced);
    text-align: center;
    font-size: 12px;
    line-height: 20px;
    @media (--desktop) {
      font-size: 14px;
      line-height: 22px;
      margin-bottom: 0;
      text-align: left;
    }
  }

  &__highlighted {
    font-weight: 700;
  }

  &__blank-state {
    margin-top: var(--space-3);
  }
}
</style>
