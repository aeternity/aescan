<template>
  <Head>
    <Title>Accounts</Title>
  </Head>

  <div class="accounts-page">
    <header class="accounts-page__header">
      <h1 class="accounts-page__title">
        Top Accounts
        <hint-tooltip class="accounts-page__tooltip">
          {{ topAccountsHints.topAccounts }}
        </hint-tooltip>
      </h1>
      <p class="accounts-page__subtitle">
        Ranked by AE balance &mdash; the largest holders on the æternity {{ networkName }}.
      </p>
    </header>

    <div class="accounts-page__overview">
      <accounts-statistics/>
      <accounts-chart-panel
        class="accounts-page__chart"
        title="Active Accounts"
        :height="170"
        :scope="CHART_SCOPE_PRESETS_OPTIONS[0]"/>
    </div>

    <top-accounts-panel v-if="!isLoading"/>
    <loader-panel v-else/>
  </div>
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

<style scoped>
.accounts-page {
  width: 100%;
  max-width: var(--container-width);
  margin: 0 auto;
  padding: var(--space-3) var(--space-1) var(--space-6);

  @media (--desktop) {
    padding: 26px var(--space-4) 90px;
  }

  &__header {
    margin: 0 0 20px;
  }

  &__title {
    display: flex;
    align-items: center;
    gap: var(--space-1);
    margin-bottom: 5px;
    font-size: 22px;
    line-height: 1.25;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--text);

    @media (--desktop) {
      font-size: 26px;
    }
  }

  &__subtitle {
    margin: 0;
    font-size: 13px;
    color: var(--text-dim);
  }

  &__overview {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 14px;
    margin-bottom: 14px;

    @media (width >= 960px) {
      grid-template-columns: 330px minmax(0, 1fr);
    }
  }

  /* Reference design: compact card with a mixed-case title instead of the uppercase panel heading */
  .accounts-page__chart {
    display: flex;
    flex-direction: column;
    padding: 14px 18px;
    border-radius: var(--r-panel);

    :deep(.panel__header) {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-1);
      padding: 0;
      margin-bottom: 6px;
    }

    :deep(.panel__heading) {
      margin: 0;
      font-size: 15px;
      line-height: 24px;
      font-weight: 600;
      letter-spacing: 0;
    }
  }
}
</style>
