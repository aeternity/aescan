<template>
  <div class="footer-socials">
    <app-link
      v-for="social in socials"
      :key="social.name"
      :title="social.name"
      class="footer-socials__link"
      :to="social.url">
      <app-icon
        :alt="social.name"
        :name="`${social.name.toLowerCase()}-logo`"
        class="footer-socials__icon"
        :size="20"/>
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
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-0);
  min-height: 40px;

  @media (--desktop) {
    gap: var(--space-2);
  }

  &__link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    border: 1px solid var(--border);
    border-radius: var(--r-pill);
    background: var(--bg-elev2);
    transition: border-color var(--dur) var(--ease);

    &:hover {
      border-color: var(--brand-line);
    }
  }

  &__icon {
    color: var(--color-midnight);
  }
}
</style>

<!-- Non-scoped: override hardcoded white fills inside inline SVG icons in dark mode -->
<style>
[data-theme='dark'] .footer-socials__icon [fill='white'],
[data-theme='dark'] .footer-socials__icon [fill='#FFFFFF'],
[data-theme='dark'] .footer-socials__icon [fill='#FAFAFA'] {
  fill: #1a1a1a;
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme='light']) .footer-socials__icon [fill='white'],
  :root:not([data-theme='light']) .footer-socials__icon [fill='#FFFFFF'],
  :root:not([data-theme='light']) .footer-socials__icon [fill='#FAFAFA'] {
    fill: #1a1a1a;
  }
}
</style>
