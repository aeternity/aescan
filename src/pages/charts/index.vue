<template>
  <Head>
    <Title>Charts</Title>
  </Head>

  <page-header>
    Charts
    <template #tooltip>
      {{ chartsHints.charts }}
    </template>
  </page-header>

  <NuxtLayout name="master-detail">
    <template #master>
      <charts-navigation/>
    </template>
    <template #detail>
      <div class="charts-sections">
        <section
          id="price"
          class="charts-sections__section">
          <price-chart-panel title-to="/charts/price"/>
        </section>
        <section
          id="transactions"
          class="charts-sections__section">
          <transactions-chart-panel title-to="/charts/transactions"/>
        </section>
        <section
          id="keyblocks"
          class="charts-sections__section">
          <keyblocks-chart-panel title-to="/charts/keyblocks"/>
        </section>
        <section
          id="contracts"
          class="charts-sections__section">
          <contracts-chart-panel title-to="/charts/contracts"/>
        </section>
        <section
          id="accounts"
          class="charts-sections__section">
          <accounts-chart-panel title-to="/charts/accounts"/>
        </section>
        <section
          id="names"
          class="charts-sections__section">
          <names-chart-panel title-to="/charts/names"/>
        </section>
        <section
          id="difficulty"
          class="charts-sections__section">
          <difficulty-chart-panel title-to="/charts/difficulty"/>
        </section>
        <section
          id="hashrate"
          class="charts-sections__section">
          <hashrate-chart-panel title-to="/charts/hashrate"/>
        </section>
      </div>
    </template>
  </NuxtLayout>
</template>

<script setup>
import { chartsHints } from '@/utils/hints/chartsHints'

const route = useRoute()

function getCurrentHash() {
  if (import.meta.client && window.location.hash) {
    return window.location.hash
  }

  return route.hash
}

function scrollToSection(hash, behavior = 'smooth', attemptsLeft = 10) {
  if (!hash) {
    return
  }

  const section = document.querySelector(hash)
  if (!section) {
    if (attemptsLeft > 0) {
      requestAnimationFrame(() => {
        scrollToSection(hash, behavior, attemptsLeft - 1)
      })
    }

    return
  }

  section.scrollIntoView({
    behavior,
    block: 'start',
  })
}

onMounted(() => {
  scrollToSection(getCurrentHash(), 'auto')
})

watch(() => route.hash, (hash) => {
  scrollToSection(hash)
})
</script>

<style scoped>
.charts-sections {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);

  &__section {
    scroll-margin-top: 88px;
  }
}
</style>
