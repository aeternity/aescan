<template>
  <Head>
    <Title>Smart Contract Verification</Title>
  </Head>
  <app-panel v-if="checkResult">
    <loader-indicator
      v-if="checkResult.data.status === 'new'"
      label="Verifying"/>
    {{ checkResult.data.status }}
    <hr>
    result {{ result }}
    <hr>
    checkResult {{ checkResult }}
    <hr>
    <div v-if="checkResult.data.status === 'success'">
      <h2>Smart Contract Verified</h2>
      <p>
        Success! Your smart contract has been verified. See
        <app-link :to="`/contracts/${id}`">
          Smart Contract detail
        </app-link>
      </p>
    </div>
    <div v-if="checkResult.data.status === 'fail'">
      <h2>Contract Verification Failed</h2>
      <p>
        Reason: <span class="error">Missing dependency</span>
        <app-button to="/contract-verification">
          Retry verification
        </app-button>
      </p>
    </div>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'

import { useContractVerificationStore } from '~/stores/contractVerification'

const timer = ref(null)

const verificationStore = useContractVerificationStore()
const { fetchVerificationCheck } = verificationStore
const { result, id, checkResult } = storeToRefs(verificationStore)

// fetchVerificationCheck(id.value, result.value.data.submissionId)
// todo move to store

onMounted(() => {
  myAsyncFunction()
  timer.value = setInterval(myAsyncFunction, 5000)
})

const myAsyncFunction = async() => {
  await fetchVerificationCheck(id.value, result.value.data.submissionId)
}

watch(checkResult, newVal => {
  console.log('newVal.data.status', newVal.data.status)
  if (newVal.data.status === 'fail' || newVal.data.status === 'success') {
    console.log('clearit')
    clearInterval(timer.value)
    timer.value = null
  }
})
</script>
