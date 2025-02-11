<template>
  <div class="pie-chart">
    <Doughnut
      :options="chartOptions"
      :data="data"/>
    <blank-state
      v-if="isEmpty"
      class="line-chart__blank-state"/>
    <loader-indicator v-if="isLoading"/>
  </div>
</template>

<script setup>

import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import { Doughnut } from 'vue-chartjs'
import { formatKnownAddress } from '~/utils/format'

const isEmpty = computed(() => props.data?.length === 0)
const isLoading = computed(() => props.data === null)

const props = defineProps({
  interval: {
    type: String,
    required: true,
  },
  topMiners: {
    type: Array,
    required: true,
  },
})
const stats = computed(() => {
  return props.topMiners.map(item => item.blocksMined)
})
const legend = computed(() => {
  return props.topMiners.map(item => formatKnownAddress(item.miner))
})
const data = {
  labels: legend.value,
  datasets: [{
    label: 'My First Dataset',
    data: stats.value,
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)',
    ],
    hoverOffset: 4,
  }],
}

//
// const labels = computed(() => {
//   return props.data.map(stat => {
//     return formatDate(stat.startDate)
//   })
// })
//
// function formatDate(label) {
//   const date = DateTime.fromISO(label)
//   if (props.interval === 'month') {
//     return date.toFormat('yyyy/MM')
//   }
//
//   return date.toFormat('MM/dd')
// }
//
// function formatNumberFractions(number) {
//   return number.toLocaleString('en-US', {
//     maximumFractionDigits: 2,
//     notation: 'compact',
//     compactDisplay: 'short',
//   })
// }
//
// const chartData = computed(() => {
//   return {
//     labels: labels.value,
//     datasets: [{
//       data: stats.value,
//       label: null,
//       cubicInterpolationMode: 'monotone',
//       tension: 0.4,
//       borderColor: '#f5274e',
//       backgroundColor: '#f5274e',
//       pointRadius: 3,
//       pointHitRadius: 20,
//     }],
//   }
// })
//
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
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
  // scales: {
  //   y: {
  //     border: {
  //       display: false,
  //     },
  //     ticks: {
  //       precision: 0,
  //       callback: function(value) {
  //         return formatNumberFractions(value)
  //       },
  //     },
  //   },
  //   x: {
  //     grid: {
  //       color: function() {
  //         return 'transparent'
  //       },
  //     },
  //   },
  // },
}
//
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// )
//
// ChartJS.defaults.font.family = 'Roboto Mono'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
)

ChartJS.defaults.font.family = 'Roboto Mono'
</script>

<style scoped>
.line-chart {
  height: 250px;
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  &__blank-state {
    width: 100%;
  }
}
</style>
