<template>
  <app-panel v-if="aciReadFunctions">
    <h3 class="contract-read-panel__title">
      Read Smart Contract Information
    </h3>
    <app-accordion :items="aciReadFunctions">
      <template #content="{content: {item: aciItem, index}}">
        <div class="contract-read-panel__container">
          <p>
            return type: <i>{{ aciItem.returns }}</i>
          </p>

          <text-input
            v-for="(argument, inputIndex) in aciItem.arguments"
            id="id"
            :key="inputIndex"
            v-model="form[aciItem.name + '-' + argument.name]"
            :placeholder="argument.type"
            type="text"
            class="contract-read-panel__input"/>

          <loader-indicator-small v-if="loadingIndex === index"/>

          <app-button
            v-else
            type="submit"
            @click="fetchFunctionResponse(aciItem, index)">
            Query
          </app-button>

          <p
            v-if="response[index]"
            :class="[
              'contract-read-panel__response',
              {'contract-read-panel__response--error': response[index].responseType === 'error' }
            ]">
            {{ response[index].responseType === 'success' ? 'Return value' : 'Error' }}:
            {{ response[index].message }}
          </p>
        </div>
      </template>
    </app-accordion>
  </app-panel>
</template>

<!--todo rename to entrypoint-->

<script setup>
import { storeToRefs } from 'pinia'
import { useContractVerifiedStore } from '@/stores/contractVerified'
import { useContractDetailsStore } from '@/stores/contractDetails'
import { useAesdk } from '@/stores/aesdk'

const { aciReadFunctions, aciObject } = storeToRefs(useContractVerifiedStore())
const { contractDetails } = storeToRefs(useContractDetailsStore())
const { aeSdk } = storeToRefs(useAesdk())

const response = ref([])
const form = ref({})
const loadingIndex = ref(null)

// todo separate

async function fetchFunctionResponse(aciItem, index) {
  loadingIndex.value = index
  let contractCallResult
  const args = getArguments(aciItem)

  const contractInstance = await aeSdk.value.initializeContract({
    aci: [aciObject.value],
    address: contractDetails.value.id,
  })

  try {
    contractCallResult = await contractInstance[aciItem.name](...args)
    response.value[index] = {
      responseType: 'success',
      message: formatEntrypointResponse(contractCallResult.decodedResult, aciItem.returns),
    }
  } catch (error) {
    response.value[index] = {
      responseType: 'error',
      message: error,
    }
  }
  loadingIndex.value = null
}

function getArguments(aciItem) {
  // todo computed
  const argumentNames = aciItem.arguments.map(argument => aciItem.name + '-' + argument.name)
  return argumentNames.map(name => form.value[name])
}

</script>

<style scoped>
.contract-read-panel__container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;

  &__input {
    display: block;
  }

  &__response {
    font-weight: 600;

    &--error {
      color: red;
    }
  }
}
</style>
