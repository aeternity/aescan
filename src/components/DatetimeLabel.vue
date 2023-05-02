<template>
  <div class="datetime-label">
    <client-only>
      <app-tooltip>
        {{ labelTime }}
        <template #tooltip>
          {{ tooltipTime }}
        </template>
      </app-tooltip>
    </client-only>
  </div>
</template>

<script setup>
import { DateTime, Duration } from 'luxon'
import AppTooltip from '@/components/AppTooltip'
import { DATETIME_UNITS } from '@/utils/constants'

const props = defineProps({
  datetime: {
    type: Object,
    required: true,
  },
})

const relativeUpdated = ref(null)
const intervalRef = ref(null)

const isOlderThanThreshold = computed(() => {
  return props.datetime.diffNow().as('year') < -1
})
const absolute = computed(() => {
  return props.datetime.toLocaleString(DateTime.DATETIME_SHORT)
})
const labelTime = computed(() => {
  return isOlderThanThreshold.value
    ? absolute.value
    : relativeUpdated.value
})
const tooltipTime = computed(() => {
  return isOlderThanThreshold.value
    ? relativeUpdated.value
    : absolute.value
})
const dynamicInterval = computed(() => {
  const highestUnitIndex = DATETIME_UNITS.indexOf(highestUnit.value)
  const updateIntervalUnit = DATETIME_UNITS[highestUnitIndex + 1] || 'seconds'
  return Duration.fromObject({ [updateIntervalUnit]: 1 }).toMillis()
})
const expirationDuration = computed(() => {
  return props.datetime.diffNow().shiftTo(...DATETIME_UNITS)
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
    relativeUpdated.value = props.datetime.setLocale('en-US').toRelative()
  } else if (isNow.value) {
    relativeUpdated.value = 'now'
  } else {
    relativeUpdated.value = expirationDuration.value.shiftTo(highestUnit.value).toHuman({ maximumFractionDigits: 0 })
  }
}
</script>

<style scoped>
.datetime-label {
  display: inline-flex;
}
</style>
