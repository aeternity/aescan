<template>
  <app-panel>
    <paginated-content
      v-model:page-index="pageIndex"
      :entities="oracles"
      :limit="limit"
      :total-count="oraclesCount"
      @prev-clicked="loadPrevOracles"
      @next-clicked="loadNextOracles">
      <template #header>
        <oracles-select v-model="selectedOracleState"/>
      </template>
      <oracles-table :oracles="oracles"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
const route = useRoute()
const { push, replace } = useRouter()

const { fetchOracles, fetchOraclesCount } = useOraclesStore()
const { oracles, oraclesCount } = storeToRefs(useOraclesStore())

const limit = isDesktop() ? 10 : 3
const pageIndex = ref(1)

function loadPrevOracles() {
  fetchOracles({ queryParameters: oracles.value.prev })
}

function loadNextOracles() {
  fetchOracles({ queryParameters: oracles.value.next })
}

async function loadOracles() {
  const { state } = route.query
  const oracleStateOption = ORACLE_STATES_OPTIONS.find(option => option.stateQuery === state)
  selectedOracleState.value = oracleStateOption || ORACLE_STATES_OPTIONS[0]
  await Promise.all([
    await fetchOracles({ limit, state: selectedOracleState.value.stateQuery }),
    await fetchOraclesCount(selectedOracleState.value.stateQuery),
  ])
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
