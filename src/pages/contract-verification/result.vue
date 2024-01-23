<template>
  <Head>
    <Title>Smart Contract Verification</Title>
  </Head>
  <page-header>
    <template #tooltip>
      <!--            {{ contractsHints.contract }}-->
      <!--      todo hint-->
    </template>
  </page-header>

  <app-panel>
    <loader-indicator
      v-if="status === 'processing'"
      label="Processing"/>

    <loader-indicator
      v-if="status === 'new'"
      label="Verifying"/>

    <div v-if="status === 'success'">
      <h2>Smart Contract Verified</h2>
      <p>
        Success! Your smart contract has been verified. See
        <app-link :to="`/contracts/${id}`">
          Smart Contract detail
        </app-link>
      </p>
    </div>
    <div v-if="status === 'fail' || status === 'Conflict'">
      <h2>Contract Verification Failed</h2>
      <p>
        <span class="error">
          {{ message }}
        </span>
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
const { fetchVerificationStatus } = verificationStore
const { result, id, verificationStatus } = storeToRefs(verificationStore)

// fetchVerificationStatus(id.value, result.value.data.submissionId)
// todo move to store
// todo navigate out
onMounted(() => {
  if (result.value.statusText !== 'Conflict') {
    loadVerificationStatus()
    timer.value = setInterval(loadVerificationStatus, 5000)
  }
})

const status = computed(() => {
  return verificationStatus.value?.data.status || result.value.statusText
})

const message = computed(() => {
  return verificationStatus.value?.data.message || result.value.data.message
})

const loadVerificationStatus = async() => {
  await fetchVerificationStatus(id.value, result.value.data.submissionId)
}

watch(verificationStatus, newStatus => {
  if (newStatus.data.status === 'fail' || newStatus.data.status === 'success') {
    clearInterval(timer.value)
    timer.value = null
  }
})
</script>
