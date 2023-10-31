<template>
  <header class="header">
    <div
      :class="[
        'header__container',
        { 'header__container--open': isMobileMenuOpen },
      ]">
      <app-link
        to="/"
        @click="closeNavigation">
        <img
          width="134"
          alt="æScan logo"
          src="@/assets/logo.svg">
      </app-link>

      <div
        class="header__hamburger"
        @click="toggleNavigation">
        <app-icon
          v-if="isMobileMenuOpen"
          name="cross"
          :size="34"/>
        <app-icon
          v-else
          name="menu"
          :size="24"/>
      </div>

      <the-navigation
        :class="[
          'header__navigation',
          { 'header__navigation--open': isMobileMenuOpen },
        ]"/>

      <network-select
        :class="[
          'header__network-select',
          { 'header__network-select--open': isMobileMenuOpen }]"/>
      <VMenu v-if="balance">
        <!--        todo fix condition-->
        <the-wallet-account

          :sdk="aeSdk"/>
        <template #popper>
          <button @click="exit">
            Exit Wallet
          </button>
        </template>
      </VMenu>
      <app-link
        v-else
        to="/wallet">
        wallet
      </app-link>
    </div>
    <div
      v-if="isSyncing"
      class="header__warning">
      Some services are currently being synced and data accuracy might be affected. Please check again later.
    </div>
    <div
      v-if="!isOnline"
      class="header__warning">
      You are currently offline. Please check your connection.
    </div>
    <div
      v-if="nodeStatus === false"
      class="header__warning">
      The Node is currently unavailable. Please check again later.
    </div>
    <div
      v-if="middlewareStatus === false"
      class="header__warning">
      The Middleware is currently unavailable. Please check again later.
    </div>
    <div
      v-if="isMarketCapAvailable === false"
      class="header__warning">
      Market Cap data are currently not available. Fiat price might not be up to date. Please check again later.
    </div>
  </header>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useOnline } from '@vueuse/core'
import { useUiStore } from '@/stores/ui'
import { storeToRefs } from 'pinia'
import TheNavigation from '@/components/TheNavigation'
import AppLink from '@/components/AppLink'
import AppIcon from '@/components/AppIcon'
import { useStatus } from '@/stores/status'
import { MENU_HASH } from '@/utils/constants'
import { useMarketStatsStore } from '@/stores/marketStats'
import NetworkSelect from '@/components/NetworkSelect'
import { useWalletStore } from '~/stores/wallet'

const route = useRoute()
const { push } = useRouter()

const walletStore = useWalletStore()
const { aeSdk, balance } = storeToRefs(walletStore)

const router = useRouter()
const { isMobileMenuOpen } = storeToRefs(useUiStore())
const isOnline = useOnline()
const { isSyncing, nodeStatus, middlewareStatus } = storeToRefs(useStatus())
const { isMarketCapAvailable } = storeToRefs(useMarketStatsStore())

onMounted(() => {
  window.addEventListener('resize', closeNavigation)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', closeNavigation)
})

watch(route, () => {
  if (route.hash !== MENU_HASH) {
    closeNavigation()
  }
})
function exit() {
  push('/')
  aeSdk.value.disconnectWallet()
}

watch(() => route.fullPath, () => {
  if (route.hash !== MENU_HASH) {
    closeNavigation()
  }
})

function toggleNavigation() {
  if (!isMobileMenuOpen.value && router.options.history.state.back === null) {
    router.push({ hash: MENU_HASH })
  }

  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

function closeNavigation() {
  isMobileMenuOpen.value = false
}
</script>

<style scoped>
.header {
  background: var(--color-white);
  display: flex;
  flex-direction: column;

  &__container {
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;

    margin: 0 auto;
    padding: var(--space-2) var(--space-3);
    column-gap: var(--space-5);

    &--open {
      padding-bottom: var(--space-6);
    }

    @media (--desktop) {
      padding: var(--space-3) 0;
      max-width: var(--container-width);
    }
  }

  &__navigation {
    display: none;
    flex-basis: 100%;
    flex-grow: 1;

    &--open {
      margin: var(--space-6) 0 0;
      display: block;
    }

    @media (--desktop) {
      height: 100%;
      flex-basis: auto;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
  }

  &__network-select {
    display: none;
    margin: var(--space-2) auto var(--space-5);

    &--open {
      display: block;
    }

    @media (--desktop) {
      margin: 0;
      display: block;
    }
  }

  &__hamburger {
    display: flex;
    margin-left: auto;
    cursor: pointer;
    color: var(--color-midnight);

    @media (--desktop) {
      display: none;
    }
  }

  &__icon {
    margin-left: var(--space-1);
  }

  &__warning {
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--color-fire);
    color: var(--color-white);
    font-family: var(--font-monospaced);
    padding: var(--space-0) var(--space-3);
    font-size: 11px;
    line-height: 16px;
    letter-spacing: 0.0015em;
  }
}
</style>
