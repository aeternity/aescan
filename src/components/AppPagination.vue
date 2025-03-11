<template>
  <div class="pagination">
    <pagination-button
      class="pagination__button--previous"
      direction="left"
      :disabled="isPrevDisabled"
      @click="$emit('prev-clicked')">
      {{ prevLabel }}
    </pagination-button>

    <pagination-button
      class="pagination__button--next"
      direction="right"
      :disabled="isNextDisabled"
      @click="$emit('next-clicked')">
      {{ nextLabel }}
    </pagination-button>
  </div>
</template>

<script setup>
defineProps({
  isPrevDisabled: {
    type: Boolean,
    default: false,
  },
  isNextDisabled: {
    type: Boolean,
    default: false,
  },
  prevLabel: {
    type: String,
    default: 'Previous',
  },
  nextLabel: {
    type: String,
    default: 'Next',
  },
})

defineEmits(['prev-clicked', 'next-clicked'])
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: space-between;

  &__button {
    &--next {
      margin-right: var(--space-1);
      @media (--desktop) {
        margin-right: 0;
      }
    }

    &--previous {
      margin-left: var(--space-1);
      @media (--desktop) {
        margin-left: 0;
      }
    }
  }
}
</style>
