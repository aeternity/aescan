<template>
  <div class="range-picker__container">
    <VueDatePicker
      ref="datepicker"
      v-model="date"
      class="range-picker"
      range
      :clearable="false"
      auto-apply
      hide-input-icon
      :enable-time-picker="false"
      :partial-range="false"
      :min-date="STATISTICS_DATA_BEGINNING"
      :max-date="today"
      placeholder="CUSTOM"
      :input-class-name="`range-picker__input ${selectedIndex === 'custom' ? 'range-picker__input--active' : ''}`"
      @update:model-value="$emit('updated', date)"/>
  </div>
</template>
<script setup>
import { DateTime } from 'luxon'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { STATISTICS_DATA_BEGINNING } from '~/utils/constants'

// todo fix imports
const date = ref()
const datepicker = ref(null)
const props = defineProps({
  selectedIndex: {
    type: String,
    required: true,
  },
  isRangeSet: {
    type: Boolean,
    required: true,
  },
})

watch(() => props.isRangeSet, (newVal, oldVal) => {
  if (!newVal && oldVal) {
    closeDatepicker()
  }
})

const today = DateTime.now().toFormat('yyyy-MM-dd')

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
  &__container {
    grid-column: span 5;
  }

  &__input {
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
    background: var(--color-snow);
    color: var(--color-midnight);

    @media (--desktop) {
      width: 68px;
      height: 32px;
      font-size: 14px;
      padding: var(--space-0) var(--space-1);
    }

    &--active {
      background: var(--color-error) !important;
      color: var(--color-white);
      /*todo color?*/
      width: 100%;
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
