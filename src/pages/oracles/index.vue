<template>
  <div class="oracles">
    <Head>
      <Title>{{ APP_TITLE_SHORT }} | Oracles</Title>
    </Head>
    <div class="oracles__parallax">
      <page-header>
        Oracles
      </page-header>
      <oracles-panel class="oracles__panel"/>
    </div>
  </div>
</template>

<script setup>
import PageHeader from '@/components/PageHeader'
import OraclesPanel from '@/components/OraclesPanel'
</script>

<style scoped>
  .oracles {
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
