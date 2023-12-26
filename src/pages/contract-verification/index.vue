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
    <file-upload/>
  </app-panel>
</template>

<script/>
