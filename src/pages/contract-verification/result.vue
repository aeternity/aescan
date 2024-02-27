<template>
  <Head>
    <Title>Smart Contract Verification Result</Title>
  </Head>
  <page-header>
    {{ title }}
  </page-header>

  <app-panel>
    <loader-indicator v-if="status === 'loading'"/>

    <loader-indicator
      v-if="status === 'pending'"
      label="pending"/>

    <loader-indicator
      v-if="status === 'processing'"
      label="Processing"/>

    <loader-indicator
      v-if="status === 'new'"
      label="Verifying"/>

    <div v-if="status === 'success'">
      <p class="contract-verification-result__paragraph">
        Success! Your Smart Contract has been successfully verified.
      </p>
      <app-link
        :to="`/contracts/${id}`"
        class="contract-verification-result__link">
        <verified-icon/>
        Smart Contract detail
      </app-link>

      <app-button to="/contract-verification">
        Verify another Smart Contract
      </app-button>
    </div>

    <div v-if="status === 'conflict'">
      <p class="contract-verification-result__paragraph">
        {{ printMessage(message) }}
      </p>
      <app-link
        :to="`/contracts/${id}`"
        class="contract-verification-result__link">
        <verified-icon/>
        Smart Contract detail
      </app-link>

      <app-button to="/contract-verification">
        Verify another Smart Contract
      </app-button>
    </div>

    <div v-if="status === 'fail'">
      <p class="contract-verification-result__paragraph">
        {{ printMessage(message) }}
      </p>
      <app-button to="/contract-verification">
        Retry verification
      </app-button>
    </div>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useContractVerificationStore } from '@/stores/contractVerification'

const timer = ref(null)

const verificationStore = useContractVerificationStore()
const { fetchVerificationStatus } = verificationStore
const { id, verificationResult, verificationStatus } = storeToRefs(verificationStore)

onMounted(() => {
  if (status.value !== 'fail' && status.value !== 'conflict') {
    loadVerificationStatus()
    timer.value = setInterval(loadVerificationStatus, 5000)
  }
})

onBeforeUnmount(() => {
  clearInterval(timer.value)
})

const loadVerificationStatus = async() => {
  await fetchVerificationStatus()
}

watch(verificationStatus, newStatus => {
  if (newStatus.status === 'fail' || newStatus.status === 'success') {
    clearInterval(timer.value)
    timer.value = null
  }
})

const status = computed(() => {
  return verificationResult.value.status || verificationStatus.value?.status || 'pending'
})

const message = computed(() => {
  return verificationResult.value.message || verificationStatus.value.message
})

const title = computed(() => {
  if (status.value === 'success') {
    return 'Smart Contract Verified'
  }
  if (status.value === 'fail') {
    return 'Contract Verification Failed'
  }
  return 'Smart Contract Verification'
})

function printMessage(message) {
  if (Array.isArray(message)) {
    return message.join('\n')
  }
  return message
}

</script>

<style scoped>
.contract-verification-result {
  &__paragraph {
    display: block;
    margin-bottom: var(--space-3);
  }

  &__link {
    display: flex;
    margin-bottom: var(--space-3);
  }
}
</style>
