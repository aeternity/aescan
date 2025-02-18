<template>
  <div class="pie-chart">
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
  return props.topMiners.blocksMined
})
const legend = computed(() => {
  return props.topMiners.miners
})
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
}
// todo fix responsive change
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
