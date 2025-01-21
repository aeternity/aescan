<template>
  <app-panel class="event-panel">
    <h4 class="event-panel__heading">
      Encoded Arguments
      <hint-tooltip variant="dark">
        {{ contractsHints.encodedEvents }}
      </hint-tooltip>
    </h4>
    <events-definition-list :arguments="args"/>
    <app-button
      v-if="!isButtonHidden"
      class="event-panel__button"
      size="sm"
      @click="decode">
      Decode
    </app-button>
    <loader-indicator-small v-if="isLoading"/>

    <template v-if="encodedEvents">
      <h4 class="event-panel__heading">
        Decoded Arguments
      </h4>

      <div class="event-panel__name">
        {{ encodedEvents[logId].name }}
      </div>

      <events-definition-list :arguments="encodedEvents[logId].args"/>
    </template>
  </app-panel>
</template>

<script setup>

import { contractsHints } from '@/utils/hints/contractsHints'

const { aeSdk } = storeToRefs(useWalletStore())

const contractVerifiedStore = useContractVerifiedStore()
const { isVerified } = storeToRefs(contractVerifiedStore)
const { getContract, parseResponse } = contractVerifiedStore

const props = defineProps({
  args: {
    type: Object,
    required: true,
  },
  callTxHash: {
    type: String,
    default: null,
  },
  logId: {
    type: Number,
    default: null,
  },
})

const encodedEvents = ref(null)
const isLoading = ref(null)

const isButtonHidden = computed(() => !isVerified.value || encodedEvents.value || isLoading.value)

async function decode() {
  if (!isVerified.value) {
    return
  }
  isLoading.value = true
  const contract = await getContract()
  const tx = await aeSdk.value.api.getTransactionInfoByHash(props.callTxHash)
  const decodedUsingContract = contract.$decodeEvents(tx.callInfo.log)
  encodedEvents.value = parseResponse(decodedUsingContract).reverse()
  isLoading.value = false
}
</script>

<style scoped>
.event-panel {
  background: var(--color-snow);

  @media (--desktop) {
    padding: var(--space-3) var(--space-4);
  }

  &__heading {
    font-family: var(--font-primary);
    margin-bottom: var(--space-1);
  }

  &__name {
    font-weight: 600;
    margin-bottom: var(--space-0);
  }

  &__button {
    font-family: var(--font-primary);
  }
}
</style>
