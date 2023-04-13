<template>
  <div class="tokens">
    <Head>
      <Title>{{ APP_TITLE_SHORT }} | Tokens</Title>
    </Head>
    <div class="tokens__parallax">
      <page-header>
        Tokens
      </page-header>
      <tokens-panel class="tokens__panel"/>
    </div>
  </div>
</template>

<script setup>
import PageHeader from '@/components/PageHeader'
import TokensPanel from '@/components/TokensPanel'
</script>

<style scoped>
.tokens {
  background-image: url("@/assets/background.svg");
  background-color: var(--color-midnight-35);
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  &__parallax {
    padding: 120px var(--space-1) var(--space-6);
    max-width: var(--container-width);
    margin: 0 auto;
    @media (--desktop) {
      padding: 120px 0;
    }
  }
}
</style>
