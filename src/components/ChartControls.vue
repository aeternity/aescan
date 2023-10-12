<template>
  <div class="chart-controls">
    <app-chip
      v-for="(button, index) in buttons"
      :key="index"
      class="chart-controls__button"
      :variant="selectedIndex === index ? 'error' : 'secondary'"
      @click="select(index)">
      {{ button.label }}
    </app-chip>
    <!--    todo componentize-->
    <div class="b">
      <VueDatePicker
        ref="datepicker"
        v-model="date"
        range
        :clearable="false"
        auto-apply
        hide-input-icon
        :enable-time-picker="false"
        :partial-range="false"
        :max-date="today"
        placeholder="CUSTOM"
        :input-class-name="`dp-custom-input ${selectedIndex === 'custom' ? 'dp-custom-active' : ''}`"
        @range-end="setActive"
        @update:model-value="doIt"/>
    </div>
  </div>
</template>

<script setup>
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { DateTime } from 'luxon'

const buttons = [
  { interval: 'day', limit: '7', label: '1W' },
  { interval: 'day', limit: '30', label: '1M' },
  { interval: 'day', limit: '90', label: '3M' },
  { interval: 'month', limit: '12', label: '1Y' },
  { interval: 'month', limit: '100', label: 'ALL' },
]
const date = ref()
const datepicker = ref(null)

// todo limit at beginning
const from = ref(DateTime.now().minus({ days: 1 }).toFormat('yyyy-MM-dd'))
const to = ref(DateTime.now().toFormat('yyyy-MM-dd'))
const today = DateTime.now().toFormat('yyyy-MM-dd')

const selectedIndex = ref(0)

function doIt(param) {
  console.log('param', param)
}

function setActive() {
  selectedIndex.value = 'custom'
}

function select(value) {
  closeDatepicker()
  selectedIndex.value = value
  emit('selected', buttons[value])
}

function closeDatepicker() {
  date.value = null
  if (datepicker) {
    datepicker.value.closeMenu()
  }
}

const emit = defineEmits(['selected'])
</script>

<style>
/*todo classes*/
.dp__main {
  display: inline-flex;
}

.dp__main > div {
  width: 100%;
}

.b {
  grid-column: span 5;

}

.dp-custom-input {
  border-radius: 4px;
  font-family: var(--font-monospaced);
  align-items: center;
  text-align: center;
  height: 28px;
  font-size: 12px;
  line-height: 20px;
  padding: var(--space-0) var(--space-1);
  background: var(--color-snow);
  color: var(--color-midnight);
  border: 0;
  font-weight: 400;

  width: 100%;
  @media (--desktop) {
    width: 68px;

    height: 32px;
    font-size: 14px;
    padding: var(--space-0) var(--space-1);
  }
}

.dp__range_start {
  background: var(--color-error) !important;
  color: var(--color-white);
}

.dp__range_end {
  background: var(--color-error) !important;
  color: var(--color-white);
}

.dp-custom-active {
  background: var(--color-error) !important;
  color: var(--color-white);
  width: 100%;
  @media (--desktop) {
    width: 208px;
  }
}

.chart-controls {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  column-gap: 8px;
  row-gap: 8px;

  @media (--desktop) {
    display: flex;
    gap: 8px;
    flex-grow: 1;
    flex-wrap: nowrap;
  }

  &__button {
    display: inline-flex;
    justify-content: center;
    cursor: pointer;
  }
}
</style>
