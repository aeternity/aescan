<template>
  <div class="hero">
    <div class="hero__container">
      <h1 class="hero__heading">
        æternity Blockchain Explorer
      </h1>
      <p class="hero__subtitle">
        Real-time data across the æternity mainnet
        &mdash; blocks, transactions, contracts, AEX-9 tokens, names &amp; oracles.
      </p>
      <div class="hero__grid">
        <!-- Chart card: placeholder until weekly blockchain-activity chart is implemented -->
        <div class="hero__chart-card">
          <div class="hero__chart-card-header">
            <span
              class="hero__chart-icon"
              aria-hidden="true"/>
            <span class="hero__chart-title">AE Blockchain Activity</span>
          </div>
          <div class="hero__chart-placeholder">
            <span class="hero__chart-placeholder-label">Chart coming soon</span>
          </div>
        </div>
        <stats-panel class="hero__stats-panel"/>
      </div>
    </div>
  </div>
</template>

<script setup>
// Chart component and featureFlags hook will be added here when the activity chart is implemented
</script>

<style scoped>
.hero {
  width: 100%;
  background-color: var(--bg);

  @media (--desktop) {
    padding: var(--space-5) 0 var(--space-4);
  }

  &__container {
    max-width: var(--container-width);
    margin: 0 auto;
    padding: 0 var(--space-3);

    @media (--desktop) {
      padding: 0 var(--space-4);
    }
  }

  &__heading {
    /* Reference spec: 26px/700/-0.02em, full-width block */
    display: block;
    width: 100%;
    font-size: 26px;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--text);
    margin-bottom: var(--space-2);
  }

  &__subtitle {
    font-size: 13px;
    line-height: 1.6;
    color: var(--text-dim);
    margin: 0 0 var(--space-4);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* Two-column layout: chart card (left, fixed) + KPI tiles (right, fills) */
  &__grid {
    display: grid;
    gap: var(--space-2);
    grid-template-columns: 1fr;

    @media (width >= 900px) {
      grid-template-columns: 320px 1fr;
    }
  }

  /* AE Price / chart card — brand-tinted, same style as reference home-price-card */
  &__chart-card {
    background: linear-gradient(150deg, var(--brand-soft), transparent 70%), var(--bg-elev);
    border: 1px solid var(--border);
    border-radius: var(--r-panel);
    padding: 13px 16px;
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  &__chart-card-header {
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }

  &__chart-icon {
    display: inline-block;
    width: 21px;
    height: 21px;
    border-radius: 7px;
    background: linear-gradient(135deg, var(--brand), var(--brand-2));
    flex-shrink: 0;
  }

  &__chart-title {
    font-size: 14px;
    font-weight: 600;
    color: var(--text);
  }

  &__chart-placeholder {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px dashed var(--border);
    border-radius: var(--r-tile);
    min-height: 80px;
  }

  &__chart-placeholder-label {
    font-size: 12px;
    color: var(--text-faint);
    font-family: var(--font-mono);
  }

  &__stats-panel {
    /* KPI tiles fill the remaining grid column */
    align-self: start;
  }
}
</style>
