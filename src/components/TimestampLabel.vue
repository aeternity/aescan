<template>
  <div class="timestamp-label">
    <client-only>
      <template v-if="isExtended">
        <app-icon name="clock"/>
        {{ relativeUpdated }} ({{ absolute }})
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

import { useAppStore } from '@/stores/app'

const { timeFormat } = storeToRefs(useAppStore())

const props = defineProps({
  timestamp: {
    type: Object,
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
  return props.timestamp
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
  console.log('props.timestamp', props.timestamp)
  console.log('DateTime.DATETIME_SHORT', DateTime.DATETIME_SHORT)
  const aaa = DateTime.fromFormat(props.timestamp, 'f')
  console.log('aaa', aaa)
  console.log('aaa.diffNow()', aaa.diffNow())
  return aaa.diffNow().shiftTo(...DATETIME_UNITS)
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
    // todo moc velky kejkle idelne passnout object
    relativeUpdated.value = DateTime.fromFormat(props.timestamp, 'f').setLocale('en-US').toRelative()
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
}
</style>
