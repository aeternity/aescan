<template>
  <header class="header">
    <div
      :class="[
        'header__container',
        { 'header__container--open': isNavigationOpen },
      ]">
      <app-link
        to="/"
        @click="closeNavigation">
        <img
          alt="æScan logo"
          src="@/assets/logo.svg">
      </app-link>

      <div
        class="header__hamburger"
        @click="toggleNavigation">
        <app-icon
          v-if="isNavigationOpen"
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
          { 'header__navigation--open': isNavigationOpen },
        ]"/>

      <network-select
        :class="[
          'header__network-select',
          { 'header__network-select--open': isNavigationOpen }]"/>

      <the-wallet-account-controls
        :sdk="aeSdk"
        :balance="balance"/>
    </div>
    <div
      v-if="isSyncing"
      class="header__warning">
      Some services are currently being synced and data accuracy might be affected. Please check again later.
    </div>
  </header>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { isDesktop } from '@/utils/screen'
import { useWalletStore } from '~/stores/wallet'
import { useStatus } from '@/stores/status'

const route = useRoute()
const walletStore = useWalletStore()
const { aeSdk, balance } = storeToRefs(walletStore)

const {
  aeSdk,
  balance,
} = storeToRefs(walletStore)

const route = useRoute()
const isNavigationOpen = ref(false)

const { isSyncing } = storeToRefs(useStatus())

onMounted(() => {
  window.addEventListener('resize', closeNavigation)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', closeNavigation)
})

watch(() => route.fullPath, () => {
  closeNavigation()
})

function toggleNavigation() {
  isNavigationOpen.value = !isNavigationOpen.value
}

function closeNavigation() {
  isNavigationOpen.value = false
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
