<template>
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__body">
        <div class="footer__column">
          <img
            class="footer__logo-aescan"
            alt="æScan logo"
            src="@/assets/logo.svg">

          <header class="footer__header">
            <app-tooltip>
              <div class="footer__powered-by">
                Powered by
              </div>
              <app-link to="https://aeternity.com/">
                <img
                  class="footer__logo-aeternity"
                  alt="æScan logo"
                  src="@/assets/logo-footer.svg"
                  width="100">
              </app-link>

              <template #tooltip>
                æternity blockchain
              </template>
            </app-tooltip>
          </header>
          <p class="footer__paragraph">
            æScan is the Explorer for the æternity Blockchain.
          </p>

          <p class="footer__paragraph">
            Engineered to scale and last, æternity is an easily accessible
            blockchain platform for the global public. With numerous innovative
            functionalities and performance far ahead of earlier blockchains,
            æternity allows its users and community to seamlessly venture into
            the new era of society, economy, and digital interactions.
          </p>
        </div>
        <div class="footer__column">
          <div class="footer__network">
            <div
              v-if="!!APP_VERSION"
              class="footer__version">
              ÆSCAN VERSION
              <app-link :to="APP_RELEASES_URL">
                v{{ APP_VERSION }}
              </app-link>
            </div>
            <div
              class="footer__version">
              NODE VERSION
              <app-link :to="NODE_RELEASES_URL">
                v{{ nodeStatus?.nodeVersion }}
              </app-link>
            </div>
            <div
              class="footer__version">
              MIDDLEWARE VERSION
              <app-link :to="MDW_RELEASES_URL">
                v{{ middlewareStatus?.mdwVersion }}
              </app-link>
              <span
                v-if="isSyncing"
                class="footer__warning">
                (syncing)
              </span>
            </div>
          </div>
          <div class="footer__link-container">
            <footer-list
              class="footer__footer-list"
              title="About"
              :links="links.about"/>

            <footer-list
              class="footer__footer-list"
              title="Developers"
              :links="links.developers"/>
          </div>
        </div>
      </div>
      <hr class="footer__divider u-hidden-mobile">
      <footer-socials/>
    </div>
  </footer>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import FooterList from '@/components/FooterList'
import AppLink from '@/components/AppLink'
import AppTooltip from '@/components/AppTooltip'
import { useStatus } from '@/stores/status'

const { middlewareStatus, nodeStatus, isSyncing } = storeToRefs(useStatus())
const { MIDDLEWARE_URL } = useRuntimeConfig().public
const { APP_VERSION } = useAppConfig()

const APP_RELEASES_URL = 'https://github.com/aeternity/aescan/releases'
const NODE_RELEASES_URL = 'https://github.com/aeternity/aeternity/releases'
const MDW_RELEASES_URL = 'https://github.com/aeternity/ae_mdw/releases'

const links = {
  about: [
    { label: 'æternity Blockchain Website', url: 'https://aeternity.com' },
    { label: 'Aeternity Foundation', url: 'https://aeternity.foundation' },
    { label: 'Blog', url: 'https://blog.aeternity.com' },
    { label: 'Terms of Service', url: '/terms-of-service' },
    { label: 'Privacy Policy', url: '/privacy-policy' },
    { label: 'Feedback Survey', url: 'https://aeternity.com/aescan-feedback-survey' },
  ],
  developers: [
    { label: 'Node API documentation', url: 'https://api-docs.aeternity.io' },
    { label: 'Middleware API documentation', url: `${MIDDLEWARE_URL}/swagger` },
    { label: 'Contribute on Github', url: 'https://github.com/aeternity/aescan' },
    { label: 'Join the Forum', url: 'https://forum.aeternity.com' },

  ],
}
</script>

<style scoped>
.footer {
  background: var(--color-white);

  &__container {
    margin: 0 auto;
    padding: var(--space-7) var(--space-4) 80px;

    @media (--desktop) {
      width: 100%;
      max-width: var(--container-width);
      padding: 120px 0;
    }
  }

  &__column {
    @media (--desktop) {
      width: 50%;

      &:first-child {
        margin-right: 160px;
      }
    }
  }

  &__network {
    font-family: var(--font-monospaced);

    margin: var(--space-4) 0;

    @media (--desktop) {
      margin: 0 0 120px;
    }
  }

  &__version:not(:last-child) {
    display: block;
    margin-bottom: var(--space-1);
  }

  &__link-container {
    display: flex;
    flex-direction: column;

    @media (--desktop) {
      flex-direction: row;
    }
  }

  &__footer-list {
    width: 100%;
    margin: 0 0 var(--space-4);

    @media (--desktop) {
      width: 246px;
      margin: 0 var(--space-7) 0 0;

      &:last-child {
        margin: 0;
      }
    }
  }

  &__body {
    flex-direction: column;
    display: flex;
    margin-bottom: var(--space-5);

    @media (--desktop) {
      flex-direction: row;
    }
  }

  &__powered-by {
    font-size: 11px;
    font-family: var(--font-monospaced);
    margin-bottom: var(--space-1);
  }

  &__logo-aescan {
    margin-bottom: 56px;
  }

  &__logo-aeternity {
    margin-right: var(--space-2);
    margin-bottom: 56px;
  }

  &__header {
    display: flex;
    align-items: center;
    margin-bottom: var(--space-3);
  }

  &__paragraph {
    margin-bottom: var(--space-3);

    @media (--desktop) {
      width: 472px;
    }

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  &__divider {
    @media (--desktop) {
      margin: 80px 0;
    }
  }

  &__warning {
    color: var(--color-fire)
  }
}
</style>
