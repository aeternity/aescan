<template>
  <app-icon
    name="plus"
    class="transaction-plus-icon"/>
</template>

<script>
import AppIcon from '@/components/AppIcon'

export default {
  name: 'TransactionPlusIcon',
  components: { AppIcon },
}

</script>

<style scoped>
.transaction-plus-icon {
  color: var(--color-blue);
}
</style>
