<template>
  <div
    class="pie-chart"
    style="position:relative">
    <Doughnut
      :options="chartOptions"
      :data="data"/>
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

const isLoading = computed(() => props.data === null)
// todo try loading separately

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
const stats = computed(() => props.topMiners.blocksMined)
const legend = computed(() => props.topMiners.miners)

const data = {
  labels: legend.value,
  datasets: [{
    data: stats.value,
    backgroundColor: [
      'rgb(0, 61, 255)',
      'rgb(102, 231, 115)',
      'rgb(245, 39, 78)',
    ],
    hoverOffset: 4,
  }],
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
      align: 'start',
    },
    tooltip: {
      tooltip: {
        position: 'top',
      },
      callbacks: {
        title: context => context.formattedValue,
        label: context => `${context.formattedValue} blocks`,
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
  ArcElement,
)

ChartJS.defaults.font.family = 'Roboto Mono'
</script>
