<template>
  <app-icon
    name="arrow-left"
    class="transaction-arrow-left-icon"/>
</template>

<script>
import AppIcon from '@/components/AppIcon'

export default {
  name: 'TransactionArrowLeftIcon',
  components: { AppIcon },
}

</script>

<style scoped>
.transaction-arrow-left-icon {
  color: var(--color-fire);
}
</style>
