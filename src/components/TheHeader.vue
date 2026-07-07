<template>
  <header class="header">
    <div
      :class="[
        'header__container',
        {'header__container--open': isMobileMenuOpen},
      ]">
      <app-link
        class="header__logo"
        to="/"
        @click="closeNavigation">
        <div
          class="header__logo-bg"
          aria-hidden="true"/>
      </app-link>

      <the-navigation
        :class="[
          'header__navigation',
          {'header__navigation--open': isMobileMenuOpen},
        ]"/>

      <!-- Mobile drawer backdrop -->
      <div
        v-if="isMobileMenuOpen"
        class="header__backdrop"
        aria-hidden="true"
        @click="closeNavigation"/>

      <the-search-bar class="header__search u-hidden-mobile"/>

      <div class="header__controls">
        <network-select class="header__network-select u-hidden-mobile"/>

        <theme-toggle/>

        <button
          class="header__hamburger"
          aria-label="Toggle navigation"
          @click="toggleNavigation">
          <svg
            v-if="isMobileMenuOpen"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.3"
            stroke-linecap="round">
            <line
              x1="6"
              y1="6"
              x2="18"
              y2="18"/>
            <line
              x1="18"
              y1="6"
              x2="6"
              y2="18"/>
          </svg>
          <svg
            v-else
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.2"
            stroke-linecap="round">
            <line
              x1="3"
              y1="6"
              x2="21"
              y2="6"/>
            <line
              x1="3"
              y1="12"
              x2="21"
              y2="12"/>
            <line
              x1="3"
              y1="18"
              x2="21"
              y2="18"/>
          </svg>
        </button>
      </div>
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
import { useOnline } from '@vueuse/core'
import { MENU_HASH } from '@/utils/constants'

const route = useRoute()
const router = useRouter()

const isOnline = useOnline()
const { isMobileMenuOpen } = storeToRefs(useUiStore())
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
  position: sticky;
  top: 0;
  z-index: 50;
  background: color-mix(in srgb, var(--bg) 86%, transparent);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--border);
  display: flex;
  flex-direction: column;

  &__container {
    display: flex;
    align-items: center;
    gap: 20px;
    height: 60px;
    width: 100%;
    max-width: var(--container-width);
    margin: 0 auto;
    padding: 0 var(--space-3);

    @media (--desktop) {
      padding: 0 var(--space-4);
    }
  }

  &__logo {
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }

  &__logo-bg {
    width: 107px;
    height: 40px;
    background-image: var(--logo-url);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: left center;
  }

  /* Desktop nav — flex row, hidden on mobile */
  &__navigation {
    display: none;

    @media (--desktop) {
      display: flex;
      align-items: center;
      flex-shrink: 0;
    }

    /* Mobile: slide-in drawer overlay */
    &--open {
      display: block;
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 81;
      width: 290px;
      max-width: 86vw;
      background: var(--bg-elev);
      border-left: 1px solid var(--border);
      box-shadow: var(--shadow);
      overflow-y: auto;
      padding: 60px 12px 22px;
    }  }

  &__search {
    flex: 1;
    max-width: 440px;
    margin: 0 auto;
  }

  /* Right-side controls cluster */
  &__controls {
    display: flex;
    align-items: center;
    gap: var(--space-1);
    margin-left: auto;
    flex-shrink: 0;

    @media (--desktop) {
      margin-left: 0;
      gap: 10px;
    }
  }

  &__network-select {
    /* visible only on desktop via u-hidden-mobile */
  }

  &__backdrop {
    position: fixed;
    inset: 0;
    z-index: 80;
    background: rgb(0 0 0 / 55%);
  }

  &__hamburger {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    padding: 0;
    background: var(--bg-elev);
    border: 1px solid var(--border);
    border-radius: 9px;
    color: var(--text-dim);
    cursor: pointer;
    flex-shrink: 0;
    transition: color var(--dur) var(--ease), border-color var(--dur) var(--ease);

    &:hover {
      color: var(--text);
      border-color: var(--brand-line);
    }

    @media (--desktop) {
      display: none;
    }
  }

  &__warning {
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--brand);
    color: var(--color-white);
    font-family: var(--font-mono);
    padding: var(--space-0) var(--space-3);
    font-size: 11px;
    line-height: 16px;
    letter-spacing: 0.0015em;
  }
}
</style>
