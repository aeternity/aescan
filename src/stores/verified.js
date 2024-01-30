import { defineStore } from 'pinia'
import { computed } from 'vue'
import useAxios from '@/composables/useAxios'

export const useContractVerifiedStore = defineStore('contractVerified', () => {
  const axios = useAxios()
  const verificationDetails = ref(null)
  const contractCode = ref(null)
  const isVerified = computed(() => !!verificationDetails?.value)

  // todo rename
  async function fetchIsContractVerified(contractId) {
    verificationDetails.value = null

    try {
      const { data } = await axios.get(`http://localhost:3000/contracts/${contractId}`)
      verificationDetails.value = data
    } catch (error) {
      verificationDetails.value = null
    }
  }

  async function fetchContractCode(contractId) {
    contractCode.value = null
    const { data } = await axios.get(`http://localhost:3000/contracts/${contractId}/source`)
    contractCode.value = data
  }

  return {
    isVerified,
    verificationDetails,
    contractCode,
    fetchContractCode,
    fetchIsContractVerified,
  }
})
