<template>
  <app-dropdown
    v-if="status === 'connected'"
    :is-disabled="!hasMenu">
    <div class="wallet-account-controls">
      <app-identicon
        :hash="address"
        class="wallet-account-controls__identicon"/>
      <app-link
        class="wallet-account-controls__link"
        to="/wallet">
        {{ formatEllipseHash(address) }}
      </app-link>
    </div>
    <template
      v-if="hasMenu"
      #menu>
      <app-button @click="disconnectWallet">
        Disconnect Wallet
      </app-button>
    </template>
  </app-dropdown>

  <app-button
    v-else
    class="wallet-account-controls__button u-hidden-mobile"
    @click="goToConnection()">
    Connect Wallet
  </app-button>
</template>
<script setup>
import { storeToRefs } from 'pinia'

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

const { go, push } = useRouter()
const walletStore = useWalletStore()
const { address, status } = storeToRefs(walletStore)
const { disconnect, setBackLink } = walletStore

function goToConnection() {
  setBackLink(props.backlink)
  push('/wallet')
}

function disconnectWallet() {
  disconnect()
  go()
}
</script>

<style scoped>
.wallet-account-controls {
  display: flex;
  align-items: center;

  &__identicon {
    margin-right: var(--space-1);
    width: 36px;
  }

  &__link {
    font-family: var(--font-monospaced);
  }

  &__button {
    color: var(--color-white) !important;
  }
}
</style>
