<template>
  <app-icon
    name="arrow-right"
    class="transaction-arrow-right-icon"/>
</template>

<script>
import AppIcon from '@/components/AppIcon'

export default {
  name: 'TransactionArrowRightIcon',
  components: { AppIcon },
}

</script>

<style scoped>
.transaction-arrow-right-icon {
  color: var(--color-fire);
}
</style>
