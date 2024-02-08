import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useRuntimeConfig } from 'nuxt/app'
import useAxios from '@/composables/useAxios'
import { adaptVerificationDetail } from '@/utils/adapters'

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

  return {
    isVerified,
    verificationDetails,
    contractCode,
    fetchContractCode,
    fetchVerificationDetail,
  }
})
