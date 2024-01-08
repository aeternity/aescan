<template>
  <Line
    :options="chartOptions"
    :data="chartData"/>
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

import { DateTime } from 'luxon'
import { Line } from 'vue-chartjs'

const props = defineProps({
  statistics: {
    type: Array,
    required: true,
  },
  selectedInterval: {
    type: String,
    required: true,
  },
})

const stats = computed(() => {
  return props.statistics.map(stat => {
    return stat.count
  })
})

const labels = computed(() => {
  return props.statistics.map(stat => {
    return formatDate(stat.startDate)
  })
})

function formatDate(label) {
  const date = DateTime.fromISO(label)

  if (props.selectedInterval === 'month') {
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
        title: function(context) {
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
      ticks: {
        callback: function(value) {
          if (value % 1 === 0) {
            return formatNumberFractions(value)
          }
        },
      },
    },
    x: {
      grid: {
        color: function() {
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
