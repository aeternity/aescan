<template>
  <div class="hero">
    <div class="hero__container">
      <div class="hero__row">
        <div class="hero__column">
          <h1 class="hero__heading">
            æternity at a glance
          </h1>
          <div class="hero__subheading">
            Welcome to æScan, the æternity blockchain explorer
          </div>
        </div>
        <div class="hero__column hero__search-column">
          <the-search-bar class="hero__search-bar"/>
        </div>
      </div>
      <market-stats class="hero__market-stats"/>
      <stats-panel/>
    </div>
  </div>
</template>

<script setup>
import TheSearchBar from '@/components/TheSearchBar'
import StatsPanel from '@/components/StatsPanel'
import MarketStats from '@/components/MarketStats'
</script>

<style scoped>
.hero {
  width: 100%;
  padding: 120px 0 var(--space-6);

  background-image: url("@/assets/background-hero.svg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  background-attachment: scroll;
  background-color: var(--color-midnight-35);

  @media (--desktop) {
    padding: 120px 0;
    margin-bottom: var(--space-5);
  }

  &__container {
    max-width: var(--container-width);
    margin: 0 auto;
    padding: 0 var(--space-3) 0;
    @media (--desktop) {
      padding: 0;
    }
  }

  &__heading {
    color: var(--color-white);
    margin-bottom: var(--space-2);
    @media (--desktop) {
      margin-bottom: var(--space-3);
    }
  }

  &__subheading {
    color: var(--color-white);
    font-size: 14px;
    line-height: 20px;
    font-family: var(--font-monospaced);
    letter-spacing: 0.0015em;
  }

  &__search-column {
    display: flex;
    align-items: flex-end;
  }

  &__search-bar {
    margin-bottom: var(--space-4);
    width: 100%;
    @media (--desktop) {
      margin-bottom: 0;
    }
  }

  &__market-stats {
    margin-bottom: var(--space-6);
    @media (--desktop) {
      margin-bottom: var(--space-4);
    }
  }

  &__row {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);

    @media (--desktop) {
      flex-direction: row;
      margin-bottom: var(--space-6);
    }
  }

  &__column {
    @media (--desktop) {
      width: 50%;
    }
  }
}
</style>
