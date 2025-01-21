import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useRuntimeConfig } from 'nuxt/app'
import { Contract } from '@aeternity/aepp-sdk'

export const useContractVerifiedStore = defineStore('contractVerified', () => {
  const { CONTRACT_VERIFICATION_SERVICE_URL } = useRuntimeConfig().public
  const { aeSdk, address } = storeToRefs(useWalletStore())
  const { contractDetails } = storeToRefs(useContractDetailsStore())

  const axios = useAxios()
  const rawVerificationDetails = ref(null)
  const contractCode = ref(null)
  const isVerified = computed(() => !!verificationDetails?.value)

  const verificationDetails = computed(() =>
    rawVerificationDetails.value
      ? adaptVerificationDetail(rawVerificationDetails.value)
      : null,
  )

  const aciObject = computed(() =>
    verificationDetails.value
      ? adaptAciObject(verificationDetails.value)
      : null,
  )

  const aciReadEntrypoints = computed(() =>
    verificationDetails.value
      ? adaptReadEntrypoints(aciObject.value)
      : null,
  )

  const aciWriteEntrypoints = computed(() =>
    verificationDetails.value
      ? adaptWriteEntrypoints(aciObject.value)
      : null,
  )

  async function getContract() {
    return await Contract.initialize({
      ...aeSdk.value.getContext(),
      aci: [aciObject.value],
      address: contractDetails.value.id,
    })
  }

  async function fetchVerificationDetail(contractId) {
    rawVerificationDetails.value = null

    try {
      const { data } = await axios.get(`${CONTRACT_VERIFICATION_SERVICE_URL}/contracts/${contractId}`)
      rawVerificationDetails.value = data
    } catch (error) {
      rawVerificationDetails.value = null
    }
  }

  async function fetchContractCode(contractId) {
    contractCode.value = null
    const { data } = await axios.get(`${CONTRACT_VERIFICATION_SERVICE_URL}/contracts/${contractId}/source`)
    contractCode.value = data
  }

  async function fetchEntrypointResponse(contract, aciItem, args) {
    try {
      const contractCallResult = await contract[aciItem.name](...args)
      return {
        responseType: 'success',
        message: formatEntrypointResponse(contractCallResult.decodedResult, aciItem.returns),
      }
    } catch (error) {
      return {
        responseType: 'error',
        message: error,
      }
    }
  }

  function parseArguments(aciItem, form) {
    const argumentNames = aciItem.arguments.map(argument => `${aciItem.name}-${argument.name}`)
    return argumentNames.map(name => form.value[name])
  }

  function parseResponse(object) {
    if (object instanceof Map) {
      for (const item of object.entries()) {
        if (typeof item[1] === 'bigint') {
          object.set(item[0], Number(item[1]))
        }
      }
    }
    for (const key in object) {
      if (typeof object[key] === 'bigint') {
        object[key] = Number(object[key])
      } else if (typeof object[key] === 'object') {
        parseResponse(object[key])
      }
    }
    return object
  }

  return {
    isVerified,
    verificationDetails,
    contractCode,
    fetchContractCode,
    fetchVerificationDetail,
    fetchEntrypointResponse,
    getContract,
    parseArguments,
    parseResponse,
    aciReadEntrypoints,
    aciWriteEntrypoints,
    canWrite: computed(() => !!address.value),
  }
})
