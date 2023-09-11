<template>
  <app-panel>
    <template #heading>
      TOTAL TRANSACTIONS
    </template>
    <template #header>
      <transactions-chart-controls/>
    </template>
    <Line
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"/>
    <transactions-chart-controls/>
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
await fetchTransactionsStatistics()
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

const chartData = {
  labels: labels.value,
  datasets: [{
    data: stats.value,
    label: 'Data One',
    cubicInterpolationMode: 'monotone',
    tension: 0.4,
  }],

}

const chartOptions = {
  plugins: {
    legend: {
      display: false,
    },

    tooltip: {
      // filter: function(tooltipItem) {
      //   console.log('tooltipItem', tooltipItem)
      //   return tooltipItem.datasetIndex === 0
      // },
      callbacks: {
        label: function(context) {
          console.log('context', context)
          const label = context.dataset.data[context.dataIndex] || ''
          // const label = 'AAA'

          return label
        },
        title: function(context) {
          // console.log('context', context)
          // const label = context.dataset.data[context.dataIndex] || ''
          const label = 'AAA'

          return null
        },
      },
    },
  },
  responsive: true,
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
