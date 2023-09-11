<template>
  <app-panel

    class="chart">
    <template #heading>
      TOTAL TRANSACTIONS
    </template>
    <template #header>
      <transactions-chart-controls @clicked="iii"/>
    </template>

    <div
      class="chart-container"
      style="position: relative; height:200px">
      <Line

        :options="chartOptions"
        :data="chartData"/>
    </div>

    <transactions-chart-controls @clicked="iii"/>
  </app-panel>
</template>

<script setup>
import { Line } from 'vue-chartjs'
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
import { storeToRefs } from 'pinia'
import { useTransactionsStore } from '~/stores/transactions'
import TransactionsChartControls from '~/components/TransactionsChartControls'

const transactionsStore = useTransactionsStore()
const {
  transactionsStatistics,
} = storeToRefs(transactionsStore)
const { fetchTransactionsStatistics } = transactionsStore

ChartJS.register(CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend)

ChartJS.defaults.font.family = 'Roboto Mono'

// await fetchTransactionsStatistics()
const stats = computed(() => {
  return transactionsStatistics.value?.data?.map(stat => {
    return stat.count
  })
})

const labels = computed(() => {
  return transactionsStatistics.value?.data?.map(stat => {
    return stat.startDate
  })
})

async function iii(val) {
  await fetchTransactionsStatistics(val)
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
      pointRadius: 4,
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
      callbacks: {
        title: function() {
          return null
        },
      },
    },
  },
  scales: {
    y: {
      border: {
        display: false,
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

</script>
