<template>
  <app-panel>
    <template #title>
      AE PRICE TREND
    </template>

    <template #end>
      <price-chart-controls
        v-model="selectedScope"
        class="u-hidden-mobile"/>
    </template>

    <div class="price-chart-panel__line-chart">
      <Line
        v-if="priceStatistics"
        :options="chartOptions"
        :data="chartData"/>
      <loader-indicator v-else/>
    </div>

    <price-chart-controls
      v-model="selectedScope"
      class="price-chart-panel__controls u-hidden-desktop"/>
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
import { DateTime } from 'luxon'

const selectedScope = ref(PRICE_CHART_SCOPE_PRESETS_OPTIONS[4])

const { priceStatistics } = storeToRefs(useChartsStore())
const { fetchPriceStatistics } = useChartsStore()

const labels = computed(() => {
  return priceStatistics.value.labels.map(label => {
    const format = selectedScope.value.intervalBy !== '1H' ? 'yyyy-MM-dd' : 'yyyy-MM-dd HH:mm'
    return DateTime.fromMillis(parseInt(label)).toFormat(format)
  })
})

await useAsyncData(async () => {
  await loadPriceStatistics()
  return true
})

if (process.client) {
  watch([selectedScope], async () => {
    await loadPriceStatistics()
  })
}

async function loadPriceStatistics() {
  await fetchPriceStatistics(selectedScope.value.intervalBy)
}

const chartData = computed(() => {
  return {
    labels: labels.value,
    datasets: [{
      data: priceStatistics.value.data,
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
        label: value => `$ ${value.formattedValue}`,
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
        callback: value => `$ ${value}`,
      },
    },
    x: {
      grid: {
        color: () => 'transparent',
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

</script>

<style scoped>
.price-chart-panel {
  &__line-chart {
    height: 250px;
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__controls {
    margin-top: var(--space-4);
  }

}
</style>
