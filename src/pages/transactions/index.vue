<template>
  <div class="transactions">
    <Head>
      <Title>{{ APP_TITLE_SHORT }} | Transactions</Title>
    </Head>
    <div class="transactions__parallax">
      <page-header>
        Transactions
      </page-header>
      <transactions-panel class="transactions__panel"/>
    </div>
  </div>
</template>

<script>
import TransactionsPanel from '@/components/TransactionsPanel'
import PageHeader from '@/components/PageHeader'

export default {
  name: 'TransactionsView',
  components: { PageHeader, TransactionsPanel },
}
</script>

<style scoped>
.transactions {
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
