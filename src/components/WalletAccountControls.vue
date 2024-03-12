<template>
  <app-dropdown
    v-if="status === 'connected'"
    :is-disabled="!hasMenu">
    <div class="wallet-account-controls">
      <app-identicon
        :hash="aeSdk.address"
        class="wallet-account-controls__identicon"/>
      <app-link
        class="wallet-account-controls__link"
        to="/wallet">
        {{ formatEllipseHash(aeSdk.address) }}
      </app-link>
    </div>
    <template
      v-if="hasMenu"
      #menu>
      <app-button
        variant="link"
        @click="exit">
        Exit Wallet
      </app-button>
    </template>
  </app-dropdown>

  <app-button
    v-else
    @click="goToConnection()">
    Connect Wallet
  </app-button>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { formatEllipseHash } from '@/utils/format'
import { useWalletStore } from '@/stores/wallet'

const props = defineProps({
  backlink: {
    type: String,
    default: null,
  },
  hasMenu: {
    type: Boolean,
    default: true,
  },
})

const { push } = useRouter()
const walletStore = useWalletStore()
const { aeSdk, status } = storeToRefs(walletStore)
const { disconnect, setBackLink } = walletStore

function goToConnection() {
  setBackLink(props.backlink)
  push('/wallet')
}

function exit() {
  disconnect()
  push('/')
}
</script>

<style scoped>
.wallet-account-controls {
  display: flex;
  align-items: center;

  &__identicon {
    margin-right: var(--space-2);
    width: 36px;
  }

  &__link {
    font-family: var(--font-monospaced);
  }

}
</style>
