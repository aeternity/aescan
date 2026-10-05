<template>
  <Head>
    <Title>Accounts</Title>
  </Head>

  <page-shell title="Top Accounts">
    <template #tooltip>
      {{ topAccountsHints.topAccounts }}
    </template>
    <template #subtitle>
      Ranked by AE balance &mdash; the largest holders on the æternity {{ networkName }}.
    </template>

    <page-overview>
      <template #tiles>
        <accounts-statistics/>
      </template>
      <accounts-chart-panel
        title="Active Accounts"
        :height="170"
        :scope="CHART_SCOPE_PRESETS_OPTIONS[0]"/>
    </page-overview>

    <top-accounts-panel v-if="!isLoading"/>
    <loader-panel v-else/>
  </page-shell>
</template>

<script setup>
import { topAccountsHints } from '@/utils/hints/topAccountsHints'

definePageMeta({
  layout: 'empty',
})

const { isLoading } = useLoading()
const { NETWORK_NAME } = useRuntimeConfig().public

const networkName = NETWORK_NAME.toLowerCase()
</script>
