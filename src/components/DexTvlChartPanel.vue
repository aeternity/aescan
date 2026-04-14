<template>
  <app-panel>
    <template #title>
      DEX TOTAL VALUE LOCKED
    </template>

    <template #end>
      <price-chart-controls
        v-model="selectedScope"
        class="u-hidden-mobile"/>
    </template>

    <div class="dex-tvl-chart-panel__line-chart">
      <template v-if="dexTvlStatistics">
        <Line
          v-if="dexTvlStatistics.data.length"
          :options="chartOptions"
          :data="chartData"/>
        <blank-state v-else>
          No DEX TVL data available for the selected period
        </blank-state>
      </template>
      <loader-indicator v-else/>
    </div>

    <price-chart-controls
      v-model="selectedScope"
      class="dex-tvl-chart-panel__controls u-hidden-desktop"/>
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

const selectedScope = ref(PRICE_CHART_SCOPE_PRESETS_OPTIONS[2])

const { dexTvlStatistics } = storeToRefs(useChartsStore())
const { fetchDexTvlStatistics } = useChartsStore()

const labels = computed(() => {
  return dexTvlStatistics.value.labels.map((label) => {
    const format = selectedScope.value.intervalBy !== '1H' ? 'yyyy-MM-dd' : 'yyyy-MM-dd HH:mm'
    return DateTime.fromMillis(parseInt(label)).toFormat(format)
  })
})

await useAsyncData('dex-tvl-statistics', async () => {
  await fetchDexTvlStatistics(selectedScope.value.intervalBy)
  return true
})

if (import.meta.client) {
  watch([selectedScope], async () => {
    await fetchDexTvlStatistics(selectedScope.value.intervalBy)
  })
}

const chartData = computed(() => ({
  labels: labels.value,
  datasets: [{
    data: dexTvlStatistics.value.data,
    label: null,
    cubicInterpolationMode: 'monotone',
    tension: 0.4,
    borderColor: '#1565c0',
    backgroundColor: '#1565c0',
    pointRadius: 3,
    pointHitRadius: 20,
  }],
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: value => `$ ${value.formattedValue}`,
      },
    },
  },
  scales: {
    y: {
      border: { display: false },
      min: 0,
      ticks: {
        callback: value => `$ ${value}`,
      },
    },
    x: {
      grid: { color: () => 'transparent' },
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
.dex-tvl-chart-panel {
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
