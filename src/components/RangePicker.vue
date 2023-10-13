<template>
  <div class="range-picker__container">
    {{ isRangeSet }}
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
      :max-date="today"
      placeholder="CUSTOM"
      :input-class-name="`range-picker__input ${selectedIndex === 'custom' ? 'range-picker__input--active' : ''}`"
      @range-end="setActive"
      @update:model-value="$emit('updated')"/>
  </div>
</template>
<script setup>
import { DateTime } from 'luxon'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

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

// todo limit at beginning
const today = DateTime.now().toFormat('yyyy-MM-dd')

function setActive() {
  emit('activated')
}

function closeDatepicker() {
  date.value = null
  if (datepicker) {
    datepicker.value.closeMenu()
  }
}

const emit = defineEmits(['updated', 'activated'])
</script>

<style>
.range-picker {
  display: inline-flex;

  &__container {
    grid-column: span 5;
  }

  & > div {
    width: 100%;
  }

  &__input {
    height: 28px;
    width: 100%;

    font-family: var(--font-monospaced);
    align-items: center;
    text-align: center;
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
      width: 100%;
      @media (--desktop) {
        width: 208px;
      }
    }
  }
}

.dp__range {
  &_start {
    background: var(--color-error) !important;
    color: var(--color-white);
  }

  &__end {
    background: var(--color-error) !important;
    color: var(--color-white);
  }
}
</style>
