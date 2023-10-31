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
  </header>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { isDesktop } from '@/utils/screen'
import { useWalletStore } from '~/stores/wallet'

const route = useRoute()
const { push } = useRouter()

const walletStore = useWalletStore()
const { aeSdk, balance } = storeToRefs(walletStore)

const isNavigationOpen = ref(false)

onMounted(() => {
  if (isDesktop()) {
    window.addEventListener('resize', closeNavigation())
  }
})

onBeforeUnmount(() => {
  if (isDesktop()) {
    window.removeEventListener('resize', closeNavigation())
  }
})

function exit() {
  push('/')
  aeSdk.value.disconnectWallet()
}

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

  &__container {
    height: 100%;
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
      width: 100%;
      padding: 15px 0;
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
      flex-basis: auto;
      display: flex;
      justify-content: flex-end;
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
}
</style>
