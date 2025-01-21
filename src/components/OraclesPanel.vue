<template>
  <app-panel>
    <paginated-content
      v-model:page-index="pageIndex"
      :entities="oracles"
      :limit="limit"
      :total-count="getOraclesCount(selectedOracleState.stateQuery)"
      @prev-clicked="loadPrevOracles"
      @next-clicked="loadNextOracles">
      <template #header>
        <oracles-select v-model="selectedOracleState"/>
      </template>
      <oracles-table
        class="u-hidden-mobile"
        :oracles="oracles"/>
      <oracles-table-condensed
        class="u-hidden-desktop"
        :oracles="oracles"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
const route = useRoute()
const { push, replace } = useRouter()

const oraclesStore = useOraclesStore()
const { fetchOracles, fetchOraclesCount, getOraclesCount } = oraclesStore
const { oracles } = storeToRefs(oraclesStore)

const limit = computed(() => process.client && isDesktop() ? 10 : 3)
const pageIndex = ref(1)

function loadPrevOracles() {
  fetchOracles(oracles.value.prev)
}

function loadNextOracles() {
  fetchOracles(oracles.value.next)
}

async function loadOracles() {
  const { state } = route.query
  const oracleStateOption = ORACLE_STATES_OPTIONS.find(option => option.stateQuery === state)
  selectedOracleState.value = oracleStateOption || ORACLE_STATES_OPTIONS[0]
  await fetchOracles(`/v3/oracles?limit=${limit.value}${selectedOracleState.value.stateQuery ? '&state=' + selectedOracleState.value.stateQuery : ''}`)
  await fetchOraclesCount()
  pageIndex.value = 1
}

const selectedOracleState = computed({
  get() {
    const { state } = route.query
    if (state === undefined) {
      return ORACLE_STATES_OPTIONS[0]
    }
    return ORACLE_STATES_OPTIONS.find(oracleState => oracleState.stateQuery === state)
  },
  set(index) {
    const newRoute = {
      query: {
        state: index.stateQuery,
      },
    }

    if (selectedOracleState.value.stateQuery === index.stateQuery) {
      // if navigating back
      return replace(newRoute)
    }
    return push(newRoute)
  },
})

if (process.client) {
  watch(() => route.fullPath, () => {
    loadOracles()
  })

  loadOracles()
}
</script>
