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
    <!-- todo abstraction -->
    <!-- todo reuse line chart -->
    <div class="line-chart">
      <Line
        v-if="priceStatistics"
        :options="chartOptions"
        :data="chartData"/>
      <loader-indicator v-else/>
    </div>

    <price-chart-controls
      v-model="selectedScope"
      class="hashrate-chart-panel__controls u-hidden-desktop"/>
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

await useAsyncData(async() => {
  await loadPriceStatistics()
  return true
})

if (process.client) {
  watch([selectedScope], async() => {
    await loadPriceStatistics()
  })
}

async function loadPriceStatistics() {
  await fetchPriceStatistics(
    selectedScope.value.intervalBy,
  )
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
        label: function(value) {
          // todo shorten function
          return `$ ${value.formattedValue}`
        },
      },
    },
  },
  // todo reeanble settings
  scales: {
    y: {
      border: {
        display: false,
      },
      min: 0,
      ticks: {
        callback: function(value) {
          return `$ ${value}`
        },
      },
    },
    x: {
      // ticks: {
      //   callback: function(context) {
      //     console.log('context', context)
      //     // console.log('DateTime.fromMillis(value)', DateTime.fromMillis(value).toFormat('yyyy-MM-dd'))
      //     // console.log('value', value)
      //     return context
      //   },
      // },
      grid: {
        color: function() {
          return 'transparent'
        },
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
