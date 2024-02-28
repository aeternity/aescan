import { defineStore } from 'pinia'
import { useRuntimeConfig } from 'nuxt/app'
import useAxios from '@/composables/useAxios'
import { adaptVerificationResult } from '@/utils/adapters'

export const useContractVerificationStore = defineStore('useContractVerificationStore', () => {
  const { CONTRACT_VERIFICATION_SERVICE_URL } = useRuntimeConfig().public
  const axios = useAxios()
  const verificationResult = ref(null)
  const verificationStatus = ref(null)
  const compilerOptions = ref(null)
  const id = ref(null)
  const submissionId = ref(null)

  async function verifyContract(contractId, license, compiler, entryFile, sourceFiles) {
    id.value = null
    verificationResult.value = null
    submissionId.value = null
    verificationStatus.value = null

    const form = new FormData()
    form.append('license', license)
    form.append('compiler', compiler)
    form.append('entryFile', entryFile)

    Array.from(sourceFiles).forEach(file => {
      form.append('sourceFiles', file)
    })

    const data = await axios.post(`${CONTRACT_VERIFICATION_SERVICE_URL}/contracts/${contractId}`, form).catch(error => {
      return error.response
    })
    id.value = contractId
    verificationResult.value = adaptVerificationResult(data.data)
    submissionId.value = data.data.submissionId
  }

  async function fetchVerificationStatus() {
    const data = await axios.get(`${CONTRACT_VERIFICATION_SERVICE_URL}/contracts/${id.value}/check/${submissionId.value}`).catch(error => {
      return error.response
    })
    verificationStatus.value = data.data
  }

  async function fetchCompilerOptions() {
    compilerOptions.value = null
    const { data } = await axios.get(`${CONTRACT_VERIFICATION_SERVICE_URL}/compilers`)
    const compilersObject = data.compilers.map((item, index) => {
      return { key: index, value: item }
    })
    compilerOptions.value = compilersObject
  }

  return {
    fetchVerificationStatus,
    verificationResult,
    verificationStatus,
    verifyContract,
    fetchCompilerOptions,
    compilerOptions,
    id,
  }
})
