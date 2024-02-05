<template>
  <div class="portfolio-stats">
    <app-panel class="portfolio-stats__panel">
      <h5>Account</h5>
      <div class="portfolio-stats__account">
        <app-identicon
          :id="aeSdk.address"
          class="portfolio-stats__identicon"/>
        <div>
          <app-link :to="aeSdk.address">
            {{ aeSdk.address }}
          </app-link>
        </div>
      </div>
    </app-panel>
    <app-panel class="portfolio-stats__panel">
      <h5>Value 1</h5>
      <div class="portfolio-stats__value">
        11,123 AE
      </div>
    </app-panel>
    <app-panel class="portfolio-stats__panel">
      <h5>Value 2</h5>
      <div class="portfolio-stats__value">
        $ 123,58
      </div>
    </app-panel>
  </div>
</template>
<script setup>

import { storeToRefs } from 'pinia'
import { useWalletStore } from '~/stores/wallet'

const walletStore = useWalletStore()
const { aeSdk } = storeToRefs(walletStore)
</script>

<style scoped>
.portfolio-stats {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  width: 100%;

  @media (--desktop) {
    flex-direction: row;
  }

  &__panel {
    padding: var(--space-4);
    width: 100%;

    @media (--desktop) {
      width: 50%;
    }
  }

  &__value {
    display: inline-flex;
    justify-content: space-between;
    width: 100%;
    font-size: 36px;
    font-family: var(--font-monospaced);
    font-weight: 400;
    margin-top: var(--space-3);
  }

  &__account {
    margin-top: var(--space-2);
    display: inline-flex;
    flex-direction: row;
    align-items: center;
  }

  &__identicon {
    width: 32px;
    height: 32px;
    margin-right: var(--space-2);
  }
}
</style>
