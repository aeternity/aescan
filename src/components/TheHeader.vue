<template>
  <header class="header">
    <div
      :class="[
        'header__container',
        { 'header__container--open': isNavigationOpen }]">
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
          { 'header__navigation--open': isNavigationOpen }]"
        @link-clicked="closeNavigation"/>

      <network-select
        :class="[
          'header__network-select',
          { 'header__network-select--open': isNavigationOpen }]"/>

      <app-link
        to="https://github.com/aeternity/aescan"
        :class="[
          'header__link',
          { 'header__link--open': isNavigationOpen }]">
        <app-button class="header__button">
          Contribute
        </app-button>
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

<script>
import TheNavigation from '@/components/TheNavigation'
import AppLink from '@/components/AppLink'
import AppIcon from '@/components/AppIcon'
import AppButton from '@/components/AppButton'
import { isDesktop } from '@/utils/screen'
import NetworkSelect from '@/components/NetworkSelect'

export default {
  name: 'TheHeader',
  components: { NetworkSelect, AppIcon, AppLink, TheNavigation, AppButton },
  data: () => ({
    isNavigationOpen: false,
  }),
  mounted() {
    if (isDesktop()) {
      window.addEventListener('resize', this.closeNavigation)
    }
  },
  beforeUnmount() {
    if (isDesktop()) {
      window.removeEventListener('resize', this.closeNavigation)
    }
  },
  methods: {
    toggleNavigation() {
      this.isNavigationOpen = !this.isNavigationOpen
    },
    closeNavigation() {
      this.isNavigationOpen = false
    },
  },
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
    padding: var(--space-2) var(--space-4);
    column-gap: var(--space-5);

    &--open {
      padding-bottom: var(--space-6);
    }

    @media (--desktop) {
      width: 100%;
      padding: 10px 0;
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
    color: var(--color-black);
    @media (--desktop) {
      display: none;
    }
  }

  &__icon {
    margin-left: var(--space-1);
  }

  &__link {
    display: none;
    flex-basis: 100%;
    justify-content: center;
    margin-top: var(--space-2);

    &--open {
      display: flex;
    }

    @media (--desktop) {
      display: flex;
      flex-basis: auto;
      margin-top: 0;
    }
  }

  &__button {
    font-weight: 500;
    padding: var(--space-3) 91px;

    @media (--desktop) {
      padding: var(--space-3) var(--space-5) !important;
    }
  }

  &__survey {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 24px;
    background: var(--color-fire);
    color: var(--color-white);
    font-family: var(--font-monospaced);
    font-size: 11px;
    line-height: 16px;
  }

  &__survey-link {
    color: var(--color-white);
    text-decoration: underline;
    margin-left: var(--space-0);
  }
}
</style>
