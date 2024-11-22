<template>
  <div class="scope-picker">
    <VueDatePicker
      ref="datepicker"
      v-model="date"
      range
      min-range="1"
      :min-date="STATISTICS_DATA_BEGINNING"
      :max-date="today"
      auto-apply
      hide-input-icon
      :clearable="false"
      :enable-time-picker="false"
      :prevent-min-max-navigation="true"
      :placeholder="placeholder"
      :ui="{input: `scope-picker__input ${isScopeSelected ? 'scope-picker__input--active' : ''}`}"
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
const today = DateTime.now().toFormat('yyyy-MM-dd')

const props = defineProps({
  isScopeSelected: {
    type: Boolean,
    required: true,
  },
  placeholder: {
    type: String,
    default: 'CUSTOM',
  },
})

watch(() => props.isScopeSelected, (newVal, oldVal) => {
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
.scope-picker {
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
      width: 208px;
      height: 40px;
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

  &__overlay_cell_active {
    background: var(--color-error);
  }

  &__scope {
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
