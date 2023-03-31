<template>
  <div class="contracts">
    <Head>
      <Title>{{ APP_TITLE_SHORT }} | Smart Contracts</Title>
    </Head>
    <div class="contracts__parallax">
      <page-header>
        Smart Contracts
      </page-header>
      <contracts-panel class="contracts__panel"/>
    </div>
  </div>
</template>

<script>
import ContractsPanel from '@/components/ContractsPanel'
import PageHeader from '@/components/PageHeader'

export default {
  name: 'TransactionsView',
  components: { PageHeader, ContractsPanel },
}
</script>

<style scoped>
.contracts {
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
