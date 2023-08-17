<template>
  <table>
    <tr>
      <th>Symbol</th>
      <th>Name</th>
      <th>Smart Contract</th>
    </tr>
    <tr
      v-for="token in tokensFound.data"
      :key="token.contractId">
      <td>
        <app-link :to="`/tokens/${token.contractId}`">
          <token-symbol-icon
            :contract-id="token.contractId"/>
          {{ token.symbol }}
        </app-link>
      </td>
      <td>{{ token.name }}</td>
      <td>{{ token.contractId }}</td>
    </tr>
  </table>
</template>

<script setup>

defineProps({
  tokensFound: {
    type: Object,
    required: true,
  },
})

</script>
