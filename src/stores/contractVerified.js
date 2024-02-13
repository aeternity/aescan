import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useRuntimeConfig } from 'nuxt/app'
import useAxios from '@/composables/useAxios'

export const useContractVerifiedStore = defineStore('contractVerified', () => {
  const { CONTRACT_VERIFICATION_SERVICE_URL } = useRuntimeConfig().public

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
      ? JSON.parse(verificationDetails.value.aci).find(item => item.contract)
      : null,
  )

  const aciReadEntrypoints = computed(() =>
    verificationDetails.value
      ? adaptAciReadEntrypoints(aciObject.value)
      : null,
  )

  const aciWriteEntrypoints = computed(() =>
    verificationDetails.value
      ? adaptAciWriteEntrypoints(aciObject.value)
      : null,
  )

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

  async function getEntrypointResponse(contractInstance, aciItem, args) {
    try {
      const contractCallResult = await contractInstance[aciItem.name](...args)
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
    const argumentNames = aciItem.arguments.map(argument => aciItem.name + '-' + argument.name)
    return argumentNames.map(name => form.value[name])
  }

  return {
    isVerified,
    verificationDetails,
    contractCode,
    fetchContractCode,
    fetchVerificationDetail,
    getEntrypointResponse,
    parseArguments,
    aciReadEntrypoints,
    aciWriteEntrypoints,
    aciObject,
  }
})
