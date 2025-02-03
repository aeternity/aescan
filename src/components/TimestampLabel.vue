<template>
  <div class="timestamp-label">
    <client-only>
      <template v-if="isExtended">
        <app-icon name="clock"/>
        {{ relativeUpdated }}
        <wbr>
        ({{ absolute }})
      </template>
      <template v-else>
        <app-tooltip>
          {{ labelTime }}
          <template #tooltip>
            {{ tooltipTime }}
          </template>
        </app-tooltip>
      </template>
    </client-only>
  </div>
</template>

<script setup>
import { DateTime, Duration } from 'luxon'
import { DATETIME_UNITS } from '@/utils/constants'
import { useUiStore } from '@/composables/ui'

const { timeFormat } = storeToRefs(useUiStore())

const props = defineProps({
  timestamp: {
    type: String,
    required: true,
  },
  isExtended: {
    type: Boolean,
    default: false,
  },
})

const relativeUpdated = ref(null)
const intervalRef = ref(null)

const absolute = computed(() => {
  return props.timestamp.toLocaleString(DateTime.DATETIME_SHORT)
})

const labelTime = computed(() => {
  return timeFormat.value === 'absolute'
    ? absolute.value
    : relativeUpdated.value
})

const tooltipTime = computed(() => {
  return timeFormat.value === 'absolute'
    ? relativeUpdated.value
    : absolute.value
})

const dynamicInterval = computed(() => {
  const highestUnitIndex = DATETIME_UNITS.indexOf(highestUnit.value)
  const updateIntervalUnit = DATETIME_UNITS[highestUnitIndex + 1] || 'seconds'
  return Duration.fromObject({ [updateIntervalUnit]: 1 }).toMillis()
})

const expirationDuration = computed(() => {
  return DateTime.fromFormat(props.timestamp, 'F').diffNow().shiftTo(...DATETIME_UNITS)
})

const highestUnit = computed(() => {
  return DATETIME_UNITS.find(unit => expirationDuration.value.get(unit) !== 0) || 'seconds'
})

const isPast = computed(() => {
  return expirationDuration.value.as('milliseconds') < 0
})

const isNow = computed(() => {
  return expirationDuration.value.as('milliseconds') === 0
})

onMounted(() => {
  update()
  intervalRef.value = setInterval(update, dynamicInterval.value)
})

onBeforeUnmount(() => {
  clearInterval(intervalRef.value)
})

function update() {
  if (isPast.value) {
    relativeUpdated.value = DateTime.fromFormat(props.timestamp, 'F').setLocale('en-US').toRelative()
  } else if (isNow.value) {
    relativeUpdated.value = 'now'
  } else {
    relativeUpdated.value = expirationDuration.value.shiftTo(highestUnit.value).toHuman({ maximumFractionDigits: 0 })
  }
}
</script>

<style scoped>
.timestamp-label {
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
}
</style>
