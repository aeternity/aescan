<template>
  <Head>
    <Title>Smart Contract Verification Result</Title>
  </Head>
  <page-header>
    {{ title }}
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
      <p class="contract-verification-result__paragraph">
        Success! Your smart contract has been verified. See
        <app-link :to="`/contracts/${id}`">
          Smart Contract detail
        </app-link>
      </p>

      <app-button to="/contract-verification">
        Verify another Smart Contract
      </app-button>
    </div>

    <div v-if="status === 'fail' || status === 'Conflict'">
      <p class="contract-verification-result__paragraph">
        {{ message }}
      </p>
      <app-button to="/contract-verification">
        Retry verification
      </app-button>
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

// todo move to store
onMounted(() => {
  if (result.value.statusText !== 'Conflict') {
    loadVerificationStatus()
    timer.value = setInterval(loadVerificationStatus, 5000)
  }
})

onBeforeUnmount(() => {
  clearInterval(timer.value)
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

const title = computed(() => {
  if (status.value === 'success') {
    return 'Smart Contract Verified'
  }
  if (status.value === 'fail' || status.value === 'Conflict') {
    return 'Contract Verification Failed'
  }
  return 'Smart Contract Verification Result'
})

watch(verificationStatus, newStatus => {
  if (newStatus.data.status === 'fail' || newStatus.data.status === 'success') {
    clearInterval(timer.value)
    timer.value = null
  }
})
</script>

<style scoped>
.contract-verification-result {
  &__paragraph {
    margin-bottom: var(--space-3);
  }
}
</style>
