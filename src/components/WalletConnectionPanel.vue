<template>
  <app-panel>
    <loader-indicator
      v-if="isProcessing"
      class="wallet-connection-panel__loader-indicator"
      :label="status"/>

    <p
      v-if="status === 'not detected'"
      class="wallet-connection-panel__paragraph">
      In order to display wallet account information, Superhero wallet has to be installed on this device.
    </p>
    <p
      v-if="status === 'denied'"
      class="wallet-connection-panel__paragraph">
      Connection with your wallet has failed. Please make sure that you are logged into your wallet.
    </p>

    <div class="wallet-connection-panel__container">
      <div v-if="status === 'detected'">
        <p class="wallet-connection-panel__paragraph">
          Superhero wallet detected
        </p>
        <wallet-connect-button/>
      </div>
      <app-button
        v-if="status === 'not detected'"
        to="https://wallet.superhero.com/">
        Download Superhero wallet
      </app-button>
      <app-button
        v-if="status === 'denied'"
        @click="router.go()">
        Try again
      </app-button>
    </div>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useWalletStore } from '@/stores/wallet'
import AppButton from '@/components/AppButton'

const walletStore = useWalletStore()

const {status} = storeToRefs(walletStore)
const router = useRouter()

const isProcessing = computed(() => {
  return status.value === 'detecting' || status.value === 'connecting' || status.value === 'disconnecting'
})

const title = computed(() => {
  if (status.value === 'not detected') {
    return 'Wallet not detected'
  } else if (status.value === 'detected') {
    return 'Superhero wallet detected'
  } else if (status.value === 'denied') {
    return 'Connection failed'
  } else {
    return null
  }
})
</script>

<style scoped>
.wallet-connection-panel {
  &__paragraph {
    margin-bottom: var(--space-5);

    @media (--desktop) {
      &:last-of-type {
        margin-bottom: var(--space-6);
      }
    }
  }

  &__container {
    display: flex;
    justify-content: center;

    @media (--desktop) {
      justify-content: flex-start;
    }
  }

  &__loader-indicator {
    margin: var(--space-3) 0;
  }
}
</style>
