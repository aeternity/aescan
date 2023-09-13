<template>
  <app-panel>
    <template #heading>
      TOTAL TRANSACTIONS
    </template>
    <template #header>
      <transactions-chart-controls
        class="transactions-chart-panel__controls"
        @selected="fetchRangeData"/>
    </template>

    <div class="transactions-chart-panel__container">
      <Line
        :options="chartOptions"
        :data="chartData"/>
    </div>

    <transactions-chart-controls
      class="transactions-chart-panel__controls--condensed"
      @selected="fetchRangeData"/>
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
import { DateTime } from 'luxon'
import { useTransactionsStore } from '~/stores/transactions'
import TransactionsChartControls from '~/components/TransactionsChartControls'

const transactionsStore = useTransactionsStore()
const {
  transactionsStatistics,
} = storeToRefs(transactionsStore)
const { fetchTransactionsStatistics } = transactionsStore

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

const selectedInterval = ref('')
// todo animation

await fetchTransactionsStatistics()

const stats = computed(() => {
  return transactionsStatistics.value?.data?.map(stat => {
    return stat.count
  })
})

const labels = computed(() => {
  return transactionsStatistics.value?.data?.map(stat => {
    return formatLabel(stat.startDate)
  })
})

function formatLabel(label) {
  const date = DateTime.fromISO(label)

  if (selectedInterval.value === 'month') {
    return date.toFormat('yyyy-MM')
  }

  return date.toFormat('MM-dd')
}

async function fetchRangeData({ interval, limit }) {
  selectedInterval.value = interval
  await fetchTransactionsStatistics(`?limit=${limit}&interval_by=${interval}`)
}

</script>

<style scoped>
.transactions-chart-panel {
  &__container {
    position: relative;
    height: 250px;
  }

  &__controls {
    display: none;
    @media (--desktop) {
      display: grid;
    }
  }

  &__controls--condensed {
    margin-top: var(--space-4);
    @media (--desktop) {
      display: none;
    }
  }
}

</style>
