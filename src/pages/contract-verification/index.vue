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
    <h3>1. Specify the contract details</h3>
    <p>
      Lorem ipsum dolor sit ametSource code verification provides transparency for users interacting with smart
      contracts. By uploading the source code.

      Please be informed that advanced settings (e.g. bytecodeHash: "none" or viaIR: "true") can be accessed via
      Solidity (Standard-Json-Input) verification method. More information can be found under Solidity's "Compiler Input
      and Output JSON Description" documentation section.

      *required field
    </p>
    <!--      smart contract details form -->

    <contract-verification-form/>
  </app-panel>
</template>

<script setup>

import ContractVerificationForm from '~/components/ContractVerificationForm'
</script>
