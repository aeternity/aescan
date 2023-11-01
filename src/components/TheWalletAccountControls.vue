<template>
  <div>
    <!--
    todo
    better
    condition-->
    <app-dropdown v-if="balance">
      <div class="wallet-account-controls">
        <app-identicon
          :id="sdk.address"
          class="wallet-account-controls__identicon"/>
        <app-link
          class="wallet-account-controls__link"
          to="/wallet">
          {{ formatEllipseHash(sdk.address) }}
        </app-link>
      </div>
      <template #menu>
        <a
          href="#"
          @click="exit">
          Exit Wallet
        </a>
      </template>
    </app-dropdown>
    <app-link
      v-else
      to="/wallet">
      wallet
    </app-link>
  </div>
</template>
<script setup>

import { formatEllipseHash } from '~/utils/format'

const { push } = useRouter()

const props = defineProps({
  sdk: {
    type: Object,
    required: true,
  },
  balance: {
    type: String,
    default: null,
  },
})

function exit() {
  push('/')
  props.sdk.disconnectWallet()
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
