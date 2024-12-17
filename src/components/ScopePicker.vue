<template>
  <div class="scope-picker">
    <VueDatePicker
      ref="datepicker"
      v-model="aaa"
      range
      min-range="1"
      :min-date="STATISTICS_DATA_BEGINNING"
      :max-date="today"
      auto-apply
      hide-input-icon
      :clearable="true"
      :enable-time-picker="false"
      :prevent-min-max-navigation="true"
      :placeholder="placeholder"
      :ui="{input: `scope-picker__input ${isScopeSelected ? 'scope-picker__input--active' : ''}`}"
      @cleared="alertFn"
      @update:model-value="$emit('updated', aaa)"/>
    <!--    <app-icon-->
    <!--      :size="28"-->
    <!--      name="cross"-->
    <!--      @click="clear()"/>-->
  </div>
</template>

<script setup>
import { DateTime } from 'luxon'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { useVModel } from '@vueuse/core'
import { STATISTICS_DATA_BEGINNING } from '@/utils/constants'

const datepicker = ref(null)
const today = DateTime.now().toFormat('yyyy-MM-dd')

const props = defineProps({
  modelValue: {
    type: Array,
    default: null,
  },
  isScopeSelected: {
    type: Boolean,
    required: true,
  },
  placeholder: {
    type: String,
    default: 'CUSTOM',
  },
})

const today = DateTime.now().toFormat('yyyy-MM-dd')

watch(() => props.isScopeSelected, (newVal, oldVal) => {
  if (!newVal && oldVal) {
    closeDatepicker()
  }
})
//
watch(date.value, (newModel, oldModel) => {
  console.log('newModel', newModel)
  console.log('oldModel', oldModel)
})

const alertFn = () => {
  date.value = null
  aaa.value = null
}

// todo rename closr
function closeDatepicker() {
  if (datepicker) {
    datepicker.value.closeMenu()
  }
  date.value = null
}

</script>

<style>
.scope-picker {
  grid-column: span 5;
  flex-direction: row;
  align-items: center;
  display: flex;

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
      width: 272px;
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
        width: 272px;
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

  &__icon {
    color: var(--color-white);
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
