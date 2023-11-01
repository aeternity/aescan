<template>
  <div>
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
        <!--        todo fix link-->
        <a
          @click="exit">
          Exit Wallet
        </a>
      </template>
    </app-dropdown>
    <!--    todo button-->
    <app-link
      v-else
      to="/wallet">
      Connect Wallet
    </app-link>
  </div>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { formatEllipseHash } from '~/utils/format'
import { useWalletStore } from '~/stores/wallet'

const { push } = useRouter()

const walletStore = useWalletStore()
const { aeSdk, status } = storeToRefs(walletStore)

function exit() {
  push('/')
  aeSdk.value.disconnectWallet()
  return false
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
}
</style>

<style>
.v-popper {
  display: inline-block;
  /*todo fix selector*/

  &__popper {
    &.v-popper--theme-menu {
      .v-popper__inner {
        margin: 0 var(--space-2);
        padding: var(--space-3);
        color: var(--color-white);
        word-break: break-word;
        /* stylelint-disable  max-nesting-depth  */
        /* as it is 3rd party component */
        @media (--desktop) {
          word-break: normal;
        }
      }
    }
  }
}

</style>
