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

<script>

import { DateTime, Duration } from 'luxon'
import AppTooltip from '@/components/AppTooltip'
import { DATETIME_UNITS } from '@/utils/constants'

export default {
  name: 'DatetimeLabel',
  components: { AppTooltip },
  props: {
    datetime: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    relativeUpdated: null,
    intervalRef: null,
  }),
  computed: {
    isOlderThanThreshold() {
      return this.datetime.diffNow().as('year') < -1
    },
    absolute() {
      return this.datetime.toLocaleString(DateTime.DATETIME_SHORT)
    },
    labelTime() {
      return this.isOlderThanThreshold
        ? this.absolute
        : this.relativeUpdated
    },
    tooltipTime() {
      return this.isOlderThanThreshold
        ? this.relativeUpdated
        : this.absolute
    },
    dynamicInterval() {
      const highestUnitIndex = DATETIME_UNITS.indexOf(this.highestUnit)
      const updateIntervalUnit = DATETIME_UNITS[highestUnitIndex + 1] || 'seconds'
      return Duration.fromObject({ [updateIntervalUnit]: 1 }).toMillis()
    },
    expirationDuration() {
      return this.datetime.diffNow().shiftTo(...DATETIME_UNITS)
    },
    highestUnit() {
      return DATETIME_UNITS.find(unit => this.expirationDuration.get(unit) !== 0) || 'seconds'
    },
    isPast() {
      return this.expirationDuration.as('milliseconds') < 0
    },
    isNow() {
      return this.expirationDuration.as('milliseconds') === 0
    },
  },
  mounted() {
    this.update()
    this.intervalRef = setInterval(this.update, this.dynamicInterval)
  },
  beforeUnmount() {
    clearInterval(this.intervalRef)
  },
  methods: {
    update() {
      if (this.isPast) {
        this.relativeUpdated = this.datetime.setLocale('en-US').toRelative()
      } else if (this.isNow) {
        this.relativeUpdated = 'now'
      } else {
        this.relativeUpdated = this.expirationDuration.shiftTo(this.highestUnit).toHuman({ maximumFractionDigits: 0 })
      }
    },
  },
}
</script>

<style scoped>
.datetime-label {
  display: inline-flex;
}
</style>
