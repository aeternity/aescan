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

<script setup>
const socials = [
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
    name: 'X',
    url: 'https://x.com/aeternity',
  },
]
</script>

<style scoped>
.footer-socials {
  display: grid;
  grid-template-columns: repeat(4, 30px);
  grid-row-gap: var(--space-4);
  justify-content: space-between;
  min-height: 105px;

  @media (--desktop) {
    grid-auto-flow: column;
    grid-template-columns: revert;
    min-height: 40px;
  }

  &__icon {
    color: var(--color-midnight);
  }
}
</style>
