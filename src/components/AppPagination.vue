<template>
  <div class="pagination">
    <div
      :class="[
        'pagination__container',
        {'pagination__container--disabled': isPrevDisabled},
      ]">
      <button
        :class="[
          'pagination__button',
          'pagination__button--prev',
          {'pagination__button--disabled': isPrevDisabled}
        ]"
        @click="$emit('prev-clicked')">
        <app-icon
          :size="22"
          name="caret-left"/>
      </button>
      <div class="pagination__label">
        {{ prevLabel }}
      </div>
    </div>
    <div
      :class="[
        'pagination__container',
        {'pagination__container--disabled': isNextDisabled},
      ]">
      <div class="pagination__label">
        {{ nextLabel }}
      </div>
      <button
        :class="[
          'pagination__button',
          'pagination__button--next',
          {'pagination__button--disabled': isNextDisabled}
        ]"
        @click="$emit('next-clicked')">
        <app-icon
          :size="22"
          name="caret-right"/>
      </button>
    </div>
  </div>
</template>
<script setup>
import AppIcon from '@/components/AppIcon'

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

  &__container {
    display: flex;
    align-items: center;
    color: var(--color-midnight);

    &--disabled {
      color: var(--color-midnight-35);
    }
  }

  &__label {
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
  }

  &__button {
    width: 32px;
    height: 32px;

    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    border: 1px solid var(--color-midnight);
    border-radius: 4px;
    cursor: pointer;

    @media (--desktop) {
      width: 32px;
      height: 32px;
    }

    &:active {
      color: var(--color-blue);
    }

    &--next {
      margin-left: var(--space-1);
    }

    &--prev {
      margin-right: var(--space-1);
    }

    &--disabled {
      pointer-events: none;
      cursor: not-allowed;
      border-color: var(--color-midnight-35);
      color: var(--color-midnight-35);
    }
  }
}
</style>
