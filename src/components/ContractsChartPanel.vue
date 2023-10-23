<template>
  <app-panel>
    <template #heading>
      CONTRACT CALLS
    </template>
    <template #header>
      <contracts-chart-controls
        class="contracts-chart-panel__chart-controls"
        @selected="loadContractsStatistics"/>
    </template>

    <div class="contracts-chart-panel__container">
      <Line
        :options="chartOptions"
        :data="chartData"/>
    </div>

    <chart-controls
      class="contracts-chart-panel__chart-controls--condensed"
      @selected="loadContractsStatistics"/>
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
import { useContractsStore } from '@/stores/contracts'

const contractsStore = useContractsStore()
const {
  contractsStatistics,
} = storeToRefs(contractsStore)
const { fetchContractsStatistics } = contractsStore

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

await useAsyncData(async() => {
  await fetchContractsStatistics()
  return true
})

const stats = computed(() => {
  return contractsStatistics.value?.map(stat => {
    return stat.count
  })
})

const labels = computed(() => {
  return contractsStatistics.value?.map(stat => {
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

async function loadContractsStatistics({ interval, limit }) {
  selectedInterval.value = interval
  await fetchContractsStatistics(`&limit=${parseInt(limit) + 1}&interval_by=${interval}`)
}

</script>

<style scoped>
.contracts-chart-panel {
  &__container {
    position: relative;
    height: 250px;
  }

  &__chart-controls {
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
