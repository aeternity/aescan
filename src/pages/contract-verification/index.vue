<template>
  <Head>
    <Title>Smart Contract Verification</Title>
  </Head>

  <page-header>
    Smart Contract Verification
    <template #tooltip>
      {{ contractsHints.contract }}
      <app-link
        variant="primary"
        to="https://docs.aeternity.com/protocol/contracts/">
        Learn more
      </app-link>
    </template>
  </page-header>
  <app-panel>
    <p class="paragraph">
      Source code verification provides transparency for users interacting with Smart Contracts.
    </p>
    <p class="paragraph">
      By uploading the source code, æScan will match the compiled code with that on the blockchain.
    </p>
    <p class="paragraph">
      Just like contracts, a "Smart Contract" should provide end users with more information on what they are "digitally
      signing" for and give users an opportunity to audit the code to independently verify that it actually does what it
      is supposed to do.
    </p>

    <contract-verification-form/>
  </app-panel>
</template>

<script setup>

import ContractVerificationForm from '~/components/ContractVerificationForm'
</script>

<style>
.paragraph {
  margin-bottom: var(--space-1);

  &:last-of-type {
    margin-bottom: var(--space-5);
  }
}
</style>
