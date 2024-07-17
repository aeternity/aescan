<template>
  <div class="range-picker">
    <VueDatePicker
      ref="datepicker"
      v-model="date"
      range
      min-range="1"
      :min-date="STATISTICS_DATA_BEGINNING"
      :max-date="today"
      auto-apply
      hide-input-icon
      :clearable="false" e
      :enable-time-picker="false"
      :prevent-min-max-navigation="true"
      placeholder="CUSTOM"
      :ui="{input: `range-picker__input ${isRangeSelected ? 'range-picker__input--active' : ''}`}"
      @update:model-value="$emit('updated', date)"/>
  </div>
</template>

<script setup>
import { DateTime } from 'luxon'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { STATISTICS_DATA_BEGINNING } from '@/utils/constants'

const date = ref()
const datepicker = ref(null)
const props = defineProps({
  isRangeSelected: {
    type: Boolean,
    required: true,
  },
})

const today = DateTime.now().toFormat('yyyy-MM-dd')

watch(() => props.isRangeSelected, (newVal, oldVal) => {
  if (!newVal && oldVal) {
    closeDatepicker()
  }
})

function closeDatepicker() {
  if (datepicker) {
    datepicker.value.closeMenu()
  }
  date.value = null
}

defineEmits(['updated'])
</script>

<style>
.range-picker {
  grid-column: span 5;

  &__input {
    background: var(--color-snow);
    color: var(--color-midnight);
    width: 100%;
    height: 28px;
    align-items: center;
    text-align: center;

    font-family: var(--font-monospaced);
    font-size: 12px;
    line-height: 20px;
    font-weight: 400;

    border-radius: 4px;
    border: 0;

    padding: var(--space-0) var(--space-1);

    @media (--desktop) {
      width: 68px;
      height: 32px;
      font-size: 14px;
      padding: var(--space-0) var(--space-1);
    }

    &::placeholder {
      color: var(--color-midnight);
      opacity: 1;
    }

    &--active {
      width: 100%;
      background: var(--color-error) !important;
      color: var(--color-white);

      @media (--desktop) {
        width: 208px;
      }
    }
  }
}

.dp {
  &__outer_menu_wrap {
    @media (--desktop) {
      width: 100%;
    }
  }

  &__range {
    &_start {
      pointer-events: none !important;
      cursor: not-allowed !important;
      background: var(--color-error) !important;
      color: var(--color-white);
    }

    &_end {
      background: var(--color-error) !important;
      color: var(--color-white);
    }
  }
}
</style>
