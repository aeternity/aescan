<template>
  <app-panel>
    <template #title>
      DEX VOLUME
    </template>

    <template #end>
      <price-chart-controls
        v-model="selectedScope"
        class="u-hidden-mobile"/>
    </template>

    <div class="dex-volume-chart-panel__bar-chart">
      <template v-if="dexVolumeStatistics">
        <Bar
          v-if="dexVolumeStatistics.data.length"
          :options="chartOptions"
          :data="chartData"/>
        <blank-state v-else>
          No DEX volume data available for the selected period
        </blank-state>
      </template>
      <loader-indicator v-else/>
    </div>

    <price-chart-controls
      v-model="selectedScope"
      class="dex-volume-chart-panel__controls u-hidden-desktop"/>
  </app-panel>
</template>

<script setup>
import { Bar } from 'vue-chartjs'
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js'
import { DateTime } from 'luxon'

const selectedScope = ref(PRICE_CHART_SCOPE_PRESETS_OPTIONS[2])

const { dexVolumeStatistics } = storeToRefs(useChartsStore())
const { fetchDexVolumeStatistics } = useChartsStore()

const labels = computed(() => {
  return dexVolumeStatistics.value.labels.map((label) => {
    const format = selectedScope.value.intervalBy !== '1H' ? 'yyyy-MM-dd' : 'yyyy-MM-dd HH:mm'
    return DateTime.fromMillis(parseInt(label)).toFormat(format)
  })
})

await useAsyncData('dex-volume-statistics', async () => {
  await fetchDexVolumeStatistics(selectedScope.value.intervalBy)
  return true
})

if (import.meta.client) {
  watch([selectedScope], async () => {
    await fetchDexVolumeStatistics(selectedScope.value.intervalBy)
  })
}

const chartData = computed(() => ({
  labels: labels.value,
  datasets: [{
    data: dexVolumeStatistics.value.data,
    label: null,
    backgroundColor: '#1565c0',
    borderRadius: 3,
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
  BarElement,
  Title,
  Tooltip,
  Legend,
)
</script>

<style scoped>
.dex-volume-chart-panel {
  &__bar-chart {
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
