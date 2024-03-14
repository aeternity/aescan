<template>
  <app-panel class="event-panel">
    <h4 class="event-panel__heading">
      Encoded Arguments
      <hint-tooltip variant="dark">
        {{ contractsHints.encodedEvents }}
      </hint-tooltip>
    </h4>
    <event-definition-list :arguments="args"/>
    <app-button
      v-if="isVerified && !encodedEvents"
      @click="decode">
      Decode
    </app-button>

    <template v-if="encodedEvents">
      <h4 class="event-panel__heading">
        Decoded Arguments
      </h4>

      <div class="event-panel__name">
        {{ encodedEvents[logId].name }}
      </div>

      <event-definition-list :arguments="encodedEvents[logId].args"/>
    </template>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { contractsHints } from '@/utils/hints/contractsHints'
import { useContractVerifiedStore } from '@/stores/contractVerified'
import { useAesdk } from '@/stores/aesdk'

const { aeSdk } = storeToRefs(useAesdk())

const contractVerifiedStore = useContractVerifiedStore()
const { isVerified } = storeToRefs(contractVerifiedStore)
const { getReadContractInstance, parseResponse } = contractVerifiedStore

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

async function decode() {
  if (!isVerified.value) {
    return
  }
  const contract = await getReadContractInstance()
  const tx = await aeSdk.value.api.getTransactionInfoByHash(props.callTxHash)
  const decodedUsingContract = contract.$decodeEvents(tx.callInfo.log)
  encodedEvents.value = parseResponse(decodedUsingContract).reverse()
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
  }
}
</style>
