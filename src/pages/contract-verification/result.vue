<template>
  <Head>
    <Title>Smart Contract Verification</Title>
  </Head>
  <app-panel>
    <loader-indicator label="Verifying"/>
    <hr>
    <h2>Smart Contract Verified</h2>
    <p>
      Success! Your smart contract has been verified. See
      <app-link to="/contracts/ct_KeTvHnhU85vuuQMMZocaiYkPL9tkoavDRT3Jsy47LK2YqLHYb">
        Smart Contract detail
      </app-link>
    </p>
    <hr>
    <h2>Contract Verification Failed</h2>
    <p>
      Reason: <span class="error">Missing dependency</span>
      <app-button to="/contract-verification">
        Retry verification
      </app-button>
    </p>
  </app-panel>
</template>

<script setup>

</script>
