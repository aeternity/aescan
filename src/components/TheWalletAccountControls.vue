<template>
  <app-dropdown v-if="status === 'connected'">
    <div class="wallet-account-controls">
      <app-identicon
        :id="aeSdk.address"
        class="wallet-account-controls__identicon"/>
      <app-link
        class="wallet-account-controls__link"
        to="/wallet">
        {{ formatEllipseHash(aeSdk.address) }}
      </app-link>
    </div>
    <template #menu>
      <app-button
        variant="link"
        @click="exit">
        Exit Wallet
      </app-button>
    </template>
  </app-dropdown>

  <app-button
    v-else
    class="wallet-account-controls__button"
    to="/wallet">
    Connect Wallet
  </app-button>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { formatEllipseHash } from '@/utils/format'
import { useWalletStore } from '@/stores/wallet'

const { go } = useRouter()

const walletStore = useWalletStore()
const { aeSdk, status } = storeToRefs(walletStore)
const { disconnect } = walletStore

function exit() {
  disconnect()
  go()
}
</script>

<style scoped>
.wallet-account-controls {
  display: flex;
  align-items: center;

  &__identicon {
    margin-right: var(--space-2);
  }

  &__link {
    font-family: var(--font-monospaced);
    font-size: 13px;
  }

  &__button {
    color: var(--color-white) !important;
  }
}
</style>
