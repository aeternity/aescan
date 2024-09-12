<template>
  <app-panel>
    <template
      v-if="title"
      #title>
      {{ title }}
    </template>

    <loader-indicator
      v-if="isProcessing"
      class="wallet-connection-panel__loader-indicator"
      :label="status"/>

    <template v-if="status === 'detected'">
      <p class="wallet-connection-panel__paragraph">
        Superhero wallet detected
      </p>
      <wallet-connect-button/>
    </template>

    <template v-if="status === 'not connected'">
      <p class="wallet-connection-panel__paragraph">
        Superhero wallet detected, but its selected network does not match.
        <br>
        Please select {{ NETWORK_NAME }} in Superhero wallet and try again.
        <br>
      </p>
      <app-button @click="router.go()">
        Try again
      </app-button>
    </template>

    <template v-if="status === 'not detected'">
      <p class="wallet-connection-panel__paragraph">
        Wallet not detected. In order to display wallet account information, install Superhero wallet.
      </p>
      <app-button to="https://wallet.superhero.com/">
        Download Superhero wallet
      </app-button>
    </template>

    <template v-if="status === 'denied'">
      <p class="wallet-connection-panel__paragraph">
        Connection with your wallet has failed. Please make sure that you are logged into your wallet.
      </p>
      <app-button @click="router.go()">
        Try again
      </app-button>
    </template>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useRuntimeConfig } from 'nuxt/app'
import { useWalletStore } from '@/stores/wallet'
import AppButton from '@/components/AppButton'

const { NETWORK_NAME } = useRuntimeConfig().public

const walletStore = useWalletStore()

const { status } = storeToRefs(walletStore)
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

  &__loader-indicator {
    margin: var(--space-3) 0;
  }
}
</style>
