<template>
  <div class="token-details">
    <Head>
      <Title>{{ APP_TITLE_SHORT }} | Token Details</Title>
    </Head>
    <div
      v-if="tokenDetails"
      class="token-details__parallax">
      <page-header>
        Token Details
      </page-header>

      <token-details-panel
        class="token-details__panel"
        :token-details="tokenDetails"/>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import TokenDetailsPanel from '@/components/TokenDetailsPanel'
import PageHeader from '@/components/PageHeader'
import { useTokenDetailsStore } from '@/stores/tokenDetails'

const tokenDetailsStore = useTokenDetailsStore()
const { tokenDetails } = storeToRefs(tokenDetailsStore)
const { fetchTokenDetails } = tokenDetailsStore
const route = useRoute()

await fetchTokenDetails(route.params.id)
</script>

  <style scoped>
  .token-details {
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

    &__panel {
      margin-bottom: var(--space-6);

      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }
  </style>
