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
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'

import { Line } from 'vue-chartjs'
import { DateTime } from 'luxon'

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

const stats = computed(() => {
  return props.data.map((stat) => {
    return stat.count
  })
})

const labels = computed(() => {
  return props.data.map((stat) => {
    return formatDate(stat.startDate)
  })
})

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

const chartData = computed(() => {
  return {
    labels: labels.value,
    datasets: [{
      data: stats.value,
      label: null,
      cubicInterpolationMode: 'monotone',
      tension: 0.4,
      borderColor: '#f5274e',
      backgroundColor: '#f5274e',
      pointRadius: 3,
      pointHitRadius: 20,
    }],
  }
})

const chartOptions = {
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
        title: function (context) {
          return context.label
        },
      },
    },
  },
  scales: {
    y: {
      border: {
        display: false,
      },
      min: 0,
      ticks: {
        precision: 0,
        callback: function (value) {
          return formatNumberFractions(value)
        },
      },
    },
    x: {
      grid: {
        color: function () {
          return 'transparent'
        },
      },
    },
  },
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

ChartJS.defaults.font.family = 'Roboto Mono'
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
