<template>
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__body">
        <div class="footer__column">
          <header class="footer__header">
            <app-tooltip>
              <app-link to="https://aeternity.com/">
                <img
                  class="footer__logo"
                  alt="æScan logo"
                  src="@/assets/logo-footer.svg"
                  height="24">
              </app-link>

              <template #tooltip>
                æternity blockchain
              </template>
            </app-tooltip>
          </header>
          <p class="footer__paragraph p">
            æScan is the Explorer for the æternity Blockchain.
          </p>
          <p class="footer__paragraph p">
            Engineered to scale and last, æternity is an easily accessible
            blockchain platform for the global public. With numerous innovative
            functionalities and performance far ahead of earlier blockchains,
            æternity allows its users and community to seamlessly venture into
            the new era of society, economy, and digital interactions.
          </p>
        </div>
        <div class="footer__column">
          <div class="footer__network">
            <div class="footer__version">
              NODE VERSION V.{{ nodeVersion }}
            </div>
            <div>
              MIDDLEWARE VERSION V.{{ middlewareVersion }}
            </div>
          </div>
          <div class="footer__link-container">
            <footer-list
              class="footer__footer-list"
              title="About"
              :links="links.about"/>

            <footer-list
              class="footer__footer-list"
              title="Join the community"
              :links="links.community"/>
          </div>
        </div>
      </div>
      <hr class="footer__divider">
      <footer-socials/>
    </div>
  </footer>
</template>
<script>
import { mapState } from 'pinia'
import FooterList from '@/components/FooterList'
import AppLink from '@/components/AppLink'
import AppTooltip from '@/components/AppTooltip'
import FooterSocials from '@/components/FooterSocials'
import { useStatus } from '@/stores/status'

export default {
  name: 'TheFooter',
  components: { FooterSocials, AppLink, FooterList, AppTooltip },

  data: () => ({
    links: {
      about: [
        { label: 'æternity Blockchain Website', url: 'https://aeternity.com' },
        { label: 'æternity Crypto Foundation', url: 'https://aeternity-foundation.org' },
        { label: 'Blog', url: 'https://blog.aeternity.com' },
      ],
      community: [
        { label: 'Contribute in the Forum', url: 'https://forum.aeternity.com' },
        { label: 'Contribute on Github', url: 'https://github.com/aeternity/aescan' },
      ],
    },
  }),
  computed: {
    ...mapState(useStatus, [
      'middlewareVersion',
      'nodeVersion',
    ]),
  },
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
    margin: var(--space-4) 0;
    font-family: var(--font-monospaced);

    @media (--desktop) {
      margin: 0 0 48px;
    }
  }

  &__version {
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
      align-items: flex-end;
    }
  }

  &__logo {
    margin-right: var(--space-2);
  }

  &__header {
    display: flex;
    align-items: center;
    margin-bottom: var(--space-3);
  }

  &__paragraph {
    margin-bottom: var(--space-3);

    @media (--desktop) {
      width: 460px;
    }

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  &__divider {
    display: none;

    @media (--desktop) {
      margin: 80px 0;
      display: revert;
    }
  }
}
</style>
