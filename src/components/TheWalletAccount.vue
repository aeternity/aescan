<template>
  <div class="wallet-account">
    <!--        todo better condition-->
    <app-identicon
      :id="sdk.address"
      class="wallet-account__identicon"/>
    <value-hash-ellipsed
      class="wallet-account__link"
      :hash="sdk.address"
      link-to="/wallet"/>
  </div>
</template>
<script setup>
defineProps({
  sdk: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.wallet-account {
  display: flex;
  align-items: center;

  &__identicon {
    margin-right: var(--space-2);
  }

  &__link {
    font-family: var(--font-monospaced);
    font-size: 13px;
  }
}

</style>
