import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useRuntimeConfig } from 'nuxt/app'
import useAxios from '@/composables/useAxios'
import { useWalletStore } from '@/stores/wallet'
import { useAesdk } from '@/stores/aesdk'
import { useContractDetailsStore } from '@/stores/contractDetails'

export const useContractVerifiedStore = defineStore('contractVerified', () => {
  const { CONTRACT_VERIFICATION_SERVICE_URL } = useRuntimeConfig().public
  const { aeSdk: walletSdk } = storeToRefs(useWalletStore())
  const { aeSdk } = storeToRefs(useAesdk())
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

  async function getReadContractInstance() {
    return await aeSdk.value.initializeContract({
      aci: [aciObject.value],
      address: contractDetails.value.id,
    })
  }

  async function getWriteContractInstance() {
    return await walletSdk.value.initializeContract({
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

  async function fetchEntrypointResponse(contractInstance, aciItem, args) {
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
    fetchEntrypointResponse,
    getReadContractInstance,
    getWriteContractInstance,
    parseArguments,
    aciReadEntrypoints,
    aciWriteEntrypoints,
    walletSdk,
  }
})
