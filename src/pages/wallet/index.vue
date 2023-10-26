<template>
  <Head>
    <Title>Wallet Account</Title>
  </Head>

  <page-header>
    Wallet Account
    <template #tooltip>
      <!--      todo hint-->
      {{ transactionsHints.transaction }}
    </template>
  </page-header>

  <app-panel class="">
    <template #heading>
      {{ status === 'not installed' ? 'Wallet not found' : '' }}
      {{ status === 'found' ? 'Connect Superhero wallet' : '' }}
    </template>

    <loader-indicator
      v-if="status === 'scanning'"
      label="Scanning for wallets"/>

    <p
      v-if="status === 'not installed'"
      class="unexpected-error__paragraph">
      In order to display wallet account information, the native Superhero wallet has to be installed on this device.
    </p>

    <div class="unexpected-error__container">
      <app-button
        v-if="status === 'not installed'"
        to="https://wallet.superhero.com/">
        Download Superhero Wallet
      </app-button>
      <div v-if="status === 'found'">
        <wallet-connect-button/>
      </div>
    </div>

    <div v-if="status === 'connected'">
      <br>
      {{ walletInfo }}
      <br>
      {{ balance }}
      <br>
    </div>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useWalletStore } from '~/stores/wallet'
import { transactionsHints } from '~/utils/hints/transactionsHints'
import PageHeader from '~/components/PageHeader'
import AppButton from '~/components/AppButton'

const walletStore = useWalletStore()
const { scanWallets } = walletStore

const {
  walletInfo,
  balance,
  status,
} = storeToRefs(walletStore)

onMounted(async() => {
  await scanWallets()
})
</script>
