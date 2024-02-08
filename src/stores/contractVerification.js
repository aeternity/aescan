import { defineStore } from 'pinia'
import { useRuntimeConfig } from 'nuxt/app'
import useAxios from '@/composables/useAxios'

export const useContractVerificationStore = defineStore('useContractVerificationStore', () => {
  const { CONTRACT_VERIFICATION_SERVICE } = useRuntimeConfig().public
  const axios = useAxios()
  const verificationResult = ref(null)
  const verificationStatus = ref(null)
  const compilerOptions = ref(null)
  const id = ref(null)
  const submissionId = ref(null)

  async function verifyContract(contractId, license, compiler, entryFile, sourceFiles) {
    id.value = null
    verificationResult.value = null
    const form = new FormData()
    form.append('license', license)
    form.append('compiler', compiler)
    form.append('entryFile', entryFile)

    sourceFiles.forEach(file => {
      form.append('sourceFiles', file)
    })

    const data = await axios.post(`${CONTRACT_VERIFICATION_SERVICE}/contracts/${contractId}`, form).catch(e => {
      return e.response
    })

    id.value = contractId
    verificationResult.value = data
    submissionId.value = data.data.submissionId
  }

  async function fetchVerificationStatus() {
    const data = await axios.get(`${CONTRACT_VERIFICATION_SERVICE}/contracts/${id.value}/check/${submissionId.value}`).catch(e => {
      return e.response
    })

    verificationStatus.value = data
  }

  async function fetchCompilerOptions() {
    compilerOptions.value = null
    const { data } = await axios.get(`${CONTRACT_VERIFICATION_SERVICE}/compilers`)
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
    submissionId,
  }
})
