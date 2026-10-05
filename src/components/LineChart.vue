<template>
  <div class="line-chart">
    <Line
      v-if="hasChart"
      :options="chartOptions"
      :data="chartData"/>
    <blank-state
      v-if="isEmpty"
      class="line-chart__blank-state"/>
    <loader-indicator v-if="isLoading"/>
  </div>
</template>

<script setup>
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'

import { Line } from 'vue-chartjs'
import { DateTime } from 'luxon'

const MAX_POINTS_WITH_MARKERS = 14

const hasChart = computed(() => props.data?.length > 0)
const isEmpty = computed(() => props.data?.length === 0)
const isLoading = computed(() => props.data === null)

const props = defineProps({
  data: {
    type: Array,
    default: null,
  },
  intervalBy: {
    type: String,
    required: true,
  },
  height: {
    type: Number,
    default: 250,
  },
})
const stats = computed(() => props.data.map(stat => stat.count))

const labels = computed(() => props.data.map(stat => formatDate(stat.startDate)))

function formatDate(label) {
  const date = DateTime.fromISO(label)
  if (props.intervalBy === 'month') {
    return date.toFormat('yyyy/MM')
  }
  return date.toFormat('MM/dd')
}

function formatNumberFractions(number) {
  return number.toLocaleString('en-US', {
    maximumFractionDigits: 2,
    notation: 'compact',
    compactDisplay: 'short',
  })
}

// Chart.js can't resolve CSS variables, so theme colors are read from the document
// and re-read whenever the theme changes
const themeVersion = ref(0)
let themeObserver = null

onMounted(() => {
  themeObserver = new MutationObserver(() => themeVersion.value++)
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
})

onBeforeUnmount(() => themeObserver?.disconnect())

function themeColor(name, fallback) {
  // Reading themeVersion makes the surrounding computed re-evaluate on theme change
  if (!import.meta.client || themeVersion.value < 0) {
    return fallback
  }
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback
}

const hasFewPoints = computed(() => props.data?.length <= MAX_POINTS_WITH_MARKERS)

const chartData = computed(() => ({
  labels: labels.value,
  datasets: [{
    data: stats.value,
    label: null,
    fill: 'origin',
    tension: 0,
    borderWidth: 2.5,
    borderJoinStyle: 'round',
    borderColor: themeColor('--brand', '#f5274e'),
    backgroundColor: themeColor('--brand-soft', 'rgb(245 39 78 / 10%)'),
    pointRadius: hasFewPoints.value ? 4.5 : 0,
    pointHoverRadius: 5,
    pointHitRadius: 20,
    pointBorderWidth: 2.5,
    pointBorderColor: themeColor('--brand', '#f5274e'),
    pointBackgroundColor: themeColor('--bg-elev', '#fff'),
  }],
}))

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      tooltip: {
        position: 'top',
      },
      callbacks: {
        title: context => context.label,
      },
    },
  },
  scales: {
    y: {
      border: {
        display: false,
      },
      grid: {
        color: themeColor('--grid', 'rgb(0 0 0 / 6%)'),
        drawTicks: false,
      },
      min: 0,
      ticks: {
        precision: 0,
        padding: 8,
        color: themeColor('--text-faint', '#888'),
        font: { size: 10.5 },
        callback: value => formatNumberFractions(value),
      },
    },
    x: {
      border: {
        display: false,
      },
      grid: {
        color: () => 'transparent',
      },
      ticks: {
        color: themeColor('--text-faint', '#888'),
        font: { size: 10.5 },
      },
    },
  },
}))

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
)

ChartJS.defaults.font.family = 'JetBrains Mono'
</script>

<style scoped>
.line-chart {
  height: v-bind(height+ 'px');
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  &__blank-state {
    width: 100%;
  }
}
</style>
