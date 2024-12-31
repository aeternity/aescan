<template>
  <div class="scope-picker">
    <VueDatePicker
      ref="datepicker"
      v-model="scope"
      :model-type="type"
      range
      min-range="1"
      :min-date="STATISTICS_DATA_BEGINNING"
      :max-date="today"
      auto-apply
      hide-input-icon
      :clearable="clearable"
      :enable-time-picker="false"
      :prevent-min-max-navigation="true"
      :placeholder="placeholder"
      :ui="inputClassNames"
      @cleared="clear"
      @update:model-value="$emit('updated', scope)"/>
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
  clearable: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'yyyy-MM-dd',
  },
})

const datepicker = ref(null)
const today = DateTime.now().toFormat('yyyy-MM-dd')
const emit = defineEmits(['update:modelValue'])
const scope = useVModel(props, 'modelValue', emit)

watch(
  () => props.isScopeSelected,
  (newVal, oldVal) => {
    if (!newVal && oldVal) {
      close()
    }
    if (!newVal) {
      clear()
    }
  },
)

function clear() {
  scope.value = null
}

function close() {
  if (datepicker.value) {
    datepicker.value.closeMenu()
  }
}

const inputClassNames = computed(() => ({
  input: `scope-picker__input
  ${props.isScopeSelected ? 'scope-picker__input--active' : ''}
  ${props.clearable ? 'scope-picker__input--clearable' : ''}`,
}))
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

    &--clearable {
      @media (--desktop) {
        width: 100px;
        padding-right: 0;
      }

      &.scope-picker__input--active {
        @media (--desktop) {
          width: 234px;
          padding-right: 28px;
        }
      }
    }
  }
}

.dp {
  &__today {
    border: 1px solid var(--color-error)
  }

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

  &__input_icons {
    padding: 6px 7px;
  }
}

</style>
