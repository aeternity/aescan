<template>
  <account-details-panel
    v-if="accountDetails"
    class="account__account-details-panel"
    :account-details="accountDetails"/>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { useWalletStore } from '~/stores/wallet'
import { useAccountStore } from '@/stores/accountDetails'

const walletStore = useWalletStore()

const { aeSdk } = storeToRefs(walletStore)

const accountStore = useAccountStore()
const { accountDetails } = storeToRefs(accountStore)
const { fetchAccount } = accountStore

fetchAccount(aeSdk.value.address)

</script>
