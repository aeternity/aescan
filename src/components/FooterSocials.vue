<template>
  <div class="footer-socials">
    <app-link
      v-for="social in socials"
      :key="social.name"
      :title="social.name"
      :to="social.url">
      <app-icon
        :alt="social.name"
        :name="`${social.name.toLowerCase()}-logo`"
        class="footer-socials__icon"
        :size="34"/>
    </app-link>
  </div>
</template>
<script>
import AppIcon from '@/components/AppIcon'
import AppLink from '@/components/AppLink'

export default {
  name: 'FooterSocials',
  components: { AppIcon, AppLink },
  data: () => ({
    socials: [
      {
        name: 'Forum',
        url: 'https://forum.aeternity.com',
      },
      {
        name: 'Telegram',
        url: 'https://telegram.me/aeternity',
      },
      {
        name: 'Reddit',
        url: 'https://reddit.com/r/Aeternity/',
      },
      {
        name: 'Linkedin',
        url: 'https://www.linkedin.com/company/aeternity',
      },
      {
        name: 'Youtube',
        url: 'https://youtube.com/@aeternityblockchain',
      },
      {
        name: 'Medium',
        url: 'https://blog.aeternity.com/',
      },
      {
        name: 'Twitter',
        url: 'https://twitter.com/aeternity',
      },
    ],
  }),
}
</script>

<style>
.footer-socials {
  display: grid;
  grid-template-columns: repeat(4, 30px);
  grid-row-gap: var(--space-4);
  justify-content: space-between;

  @media (--desktop) {
    grid-auto-flow: column;
    grid-template-columns: revert;
  }

  &__icon {
    color: var(--color-midnight);
  }
}
</style>
