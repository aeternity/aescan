<template>
  <app-panel class="">
    <template
      v-if="status !== 'scanning'"
      #heading>
      {{ title }}
    </template>

    <loader-indicator
      v-if="status === 'scanning'"
      label="Scanning for wallets"/>

    <p
      v-if="status === 'not installed'"
      class="wallet-connection-panel__paragraph">
      In order to display wallet account information, the native Superhero wallet has to be installed on this device.
    </p>

    <div class="wallet-connection-panel__container">
      <app-button
        v-if="status === 'not installed'"
        to="https://wallet.superhero.com/">
        Download Superhero wallet
      </app-button>
      <div v-if="status === 'found'">
        <wallet-connect-button/>
      </div>
    </div>
  </app-panel>
</template>

<script setup>
// todo fix imports
import { storeToRefs } from 'pinia'
import { useWalletStore } from '~/stores/wallet'
import AppButton from '~/components/AppButton'

const walletStore = useWalletStore()

const { status } = storeToRefs(walletStore)

const title = computed(() => {
  if (status.value === 'not installed') {
    return 'Wallet not found'
  } else if (status.value === 'found') {
    return 'Connect Superhero wallet'
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
}
</style>
