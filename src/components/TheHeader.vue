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
      <div v-if="balance">
        <!--        todo better condition-->
        <app-identicon :id="aeSdk.address"/>
        <value-hash-ellipsed
          :hash="aeSdk.address"
          link-to="/wallet"/>
      </div>
      <app-link
        v-else
        to="/wallet">
        wallet
      </app-link>
    </div>
    <div class="header__survey">
      Help us improve aeScan.
      <app-link
        to="https://aeternity.com/aescan-feedback-survey"
        class="header__survey-link">
        Fill out the survey.
      </app-link>
    </div>
  </header>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import TheNavigation from '@/components/TheNavigation'
import AppLink from '@/components/AppLink'
import AppIcon from '@/components/AppIcon'
import { isDesktop } from '@/utils/screen'
import NetworkSelect from '@/components/NetworkSelect'
import { useWalletStore } from '~/stores/wallet'

const walletStore = useWalletStore()

const {
  aeSdk,
  balance,
} = storeToRefs(walletStore)
const route = useRoute()
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

watch(route, () => {
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
  flex: 0 0 auto;

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

  &__survey {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 24px;
    background: var(--color-midnight);
    color: var(--color-white);
    font-family: var(--font-monospaced);
    font-size: 11px;
    line-height: 16px;
    letter-spacing: 0.0015em;
  }

  &__survey-link {
    color: var(--color-white);
    text-decoration: underline;
    margin-left: var(--space-0);
  }
}
</style>
