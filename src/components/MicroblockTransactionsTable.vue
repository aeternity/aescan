<template>
  <div class="microblock-transactions-table">
    <block-transactions-table :transactions="transactions"/>
  </div>
</template>

<script setup>
defineProps({
  transactions: {
    type: Object,
    required: true,
  },
})
</script>
