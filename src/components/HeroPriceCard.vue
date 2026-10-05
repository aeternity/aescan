<template>
  <div class="hero-price-card">
    <div class="hero-price-card__header">
      <div class="hero-price-card__title">
        <span
          class="hero-price-card__icon"
          aria-hidden="true"/>
        AE Price
      </div>
      <div class="hero-price-card__price-container">
        <span class="hero-price-card__price">
          ${{ formatNullable(formattedPrice) }}
        </span>
        <span
          v-if="priceChange !== null"
          :class="['hero-price-card__change', {'hero-price-card__change--down': isDown}]">
          <svg
            class="hero-price-card__arrow"
            viewBox="0 0 24 24"
            aria-hidden="true">
            <path :d="isDown ? 'M12 19l7-9H5z' : 'M12 5l7 9H5z'"/>
          </svg>
          {{ Math.abs(priceChange) }}%
        </span>
      </div>
    </div>
    <svg
      v-if="sparkline"
      class="hero-price-card__chart"
      viewBox="0 0 280 70"
      preserveAspectRatio="none"
      aria-hidden="true">
      <defs>
        <linearGradient
          id="hero-price-gradient"
          x1="0"
          y1="0"
          x2="0"
          y2="1">
          <stop
            offset="0"
            stop-color="var(--brand)"
            stop-opacity=".25"/>
          <stop
            offset="1"
            stop-color="var(--brand)"
            stop-opacity="0"/>
        </linearGradient>
      </defs>
      <path
        :d="sparkline.area"
        fill="url(#hero-price-gradient)"/>
      <path
        :d="sparkline.line"
        class="hero-price-card__line"/>
    </svg>
    <div
      v-else
      class="hero-price-card__chart"/>
    <div class="hero-price-card__footer">
      <div>
        <div class="hero-price-card__label">
          Market Cap
        </div>
        <div class="hero-price-card__value">
          {{ formatUsd(marketCap) }}
        </div>
      </div>
      <div class="hero-price-card__footer-end">
        <div class="hero-price-card__label">
          24h Vol
        </div>
        <div class="hero-price-card__value">
          {{ formatUsd(volume24h) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const CHART_WIDTH = 280
const CHART_HEIGHT = 70
const CHART_PADDING = 4
const MAX_POINTS = 60

const { price, priceChange, marketCap, volume24h } = storeToRefs(useMarketStatsStore())

const { data: priceHistory } = useLazyAsyncData(
  'hero-price-history',
  () => $fetch('/api/tokens/ae/price-chart?timeFrame=1W').catch(() => null),
)

const isDown = computed(() => Number(priceChange.value) < 0)

const formattedPrice = computed(() => {
  return price.value === null ? null : Number(price.value).toFixed(price.value < 0.01 ? 5 : 4)
})

const sparkline = computed(() => {
  const values = priceHistory.value?.data
  if (!values || values.length < 2) {
    return null
  }

  const step = Math.max(1, Math.floor(values.length / MAX_POINTS))
  const points = values.filter((_, index) => index % step === 0)
  const min = Math.min(...points)
  const range = (Math.max(...points) - min) || 1
  const coordinates = points.map((value, index) => {
    const x = (index / (points.length - 1)) * CHART_WIDTH
    const y = CHART_HEIGHT - CHART_PADDING - ((value - min) / range) * (CHART_HEIGHT - 2 * CHART_PADDING)
    return `${x.toFixed(1)} ${y.toFixed(1)}`
  })
  const line = `M${coordinates.join(' L')}`

  return {
    line,
    area: `${line} L${CHART_WIDTH} ${CHART_HEIGHT} L0 ${CHART_HEIGHT} Z`,
  }
})

function formatUsd(value) {
  return value === null ? '-' : `$${formatCompactNumber(value)}`
}
</script>

<style scoped>
.hero-price-card {
  display: flex;
  flex-direction: column;
  padding: 13px 16px;
  background: linear-gradient(150deg, var(--brand-soft), transparent 70%), var(--bg-elev);
  border: 1px solid var(--border);
  border-radius: var(--r-panel);

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-1);
    margin-bottom: 10px;
  }

  &__title {
    display: flex;
    align-items: center;
    gap: var(--space-1);
    font-size: 14px;
    font-weight: 600;
    color: var(--text);
  }

  &__icon {
    width: 21px;
    height: 21px;
    border-radius: 7px;
    background: linear-gradient(135deg, var(--brand), var(--brand-2));
    flex-shrink: 0;
  }

  &__price-container {
    display: flex;
    align-items: baseline;
    gap: 6px;
  }

  &__price {
    font-family: var(--font-monospaced);
    font-size: 20px;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: var(--text);
  }

  &__change {
    display: inline-flex;
    align-items: center;
    gap: 2px;
    font-size: 12px;
    font-weight: 600;
    color: var(--up);

    &--down {
      color: var(--down);
    }
  }

  &__arrow {
    width: 10px;
    height: 10px;
    fill: currentcolor;
  }

  &__chart {
    flex: 1;
    width: 100%;
    min-height: 38px;
    margin-top: 6px;
    overflow: visible;
  }

  &__line {
    fill: none;
    stroke: var(--brand);
    stroke-width: 2;
    stroke-linejoin: round;
    vector-effect: non-scaling-stroke;
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    margin-top: 9px;
    padding-top: 9px;
    border-top: 1px solid var(--border-soft);
    font-size: 11.5px;
  }

  &__footer-end {
    text-align: right;
  }

  &__label {
    margin-bottom: 3px;
    color: var(--text-faint);
  }

  &__value {
    font-family: var(--font-monospaced);
    font-weight: 600;
    color: var(--text);
  }
}
</style>
