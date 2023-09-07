<template>
  <app-panel>
    <Line
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"/>
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
  datasets: [{ data: stats.value, label: 'Data One' }],
}
const chartOptions = {
  responsive: true,
}

</script>
