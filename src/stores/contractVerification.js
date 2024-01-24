import { defineStore } from 'pinia'
import useAxios from '@/composables/useAxios'

export const useContractVerificationStore = defineStore('useContractVerificationStore', () => {
  const axios = useAxios()
  const verificationResult = ref(null)
  const verificationStatus = ref(null)
  const compilerOptions = ref(null)
  const id = ref(null)
  const submissionId = ref(null)

  // todo change url

  async function verifyContract(contractId, license, compiler, entryFile, sourceFiles) {
    id.value = null
    verificationResult.value = null
    verificationStatus.value = null

    const form = new FormData()
    form.append('license', license)
    form.append('compiler', compiler)
    form.append('entryFile', entryFile)

    for (let i = 0; i < sourceFiles.length; i++) {
      form.append('sourceFiles', sourceFiles.item(i))
    }

    const data = await axios.post(`http://localhost:3000/contracts/${contractId}`, form).catch(e => {
      return e.response
    })

    id.value = contractId
    verificationResult.value = data
    submissionId.value = data.data.submissionId
  }

  async function fetchVerificationStatus() {
    const data = await axios.get(`http://localhost:3000/contracts/${id.value}/check/${submissionId.value}`).catch(e => {
      return e.response
    })

    verificationStatus.value = data
  }

  async function fetchCompilerOptions() {
    compilerOptions.value = null
    const { data } = await axios.get('http://localhost:3000/compilers')
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
