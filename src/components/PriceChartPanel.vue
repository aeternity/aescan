<template>
  <app-panel>
    <template #title>
      PRICE
    </template>
    <!--    {{ priceStatistics }}-->

    <Line
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
import { DateTime } from 'luxon'

const { priceStatistics } = storeToRefs(useChartsStore())
const { fetchPriceStatistics } = useChartsStore()

const props = defineProps({
  hasSelect: {
    default: true,
    type: Boolean,
  },
  scope: {
    required: true,
    type: Object,
    default: CHART_SCOPE_PRESETS_OPTIONS[4],
  },
})

const labels = computed(() => {
  return priceStatistics.value.labels.map(label => {
    console.log('label', label)

    const aaa = DateTime.fromMillis(parseInt(label)).toFormat('yyyy-MM-dd')
    console.log('aaa', aaa)
    return aaa
  })
})

await useAsyncData(async() => {
  await fetchPriceStatistics()
  return true
})

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
  // maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      tooltip: {
        position: 'top',
      },
      // callbacks: {
      //   title: function(context) {
      //     console.log('context', context)
      //     console.log('DateTime.fromMillis(context.label)',
      //       DateTime.fromMillis(context))
      //   },
      // },
    },
  },
  scales: {
    y: {
      border: {
        display: false,
      },
      min: 0,
      // ticks: {
      //   precision: 0.01,
      //   callback: function(value) {
      //     return `$${value}`
      //   },
      // },
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
.transactions-chart-panel {
  &__controls {
    margin-top: var(--space-4);

    &--desktop {
      margin-bottom: 0;
    }
  }

  &__select {
    margin-top: var(--space-2);

    @media (--desktop) {
      margin-top: 0;
    }
  }
}
</style>
