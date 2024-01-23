import { defineStore } from 'pinia'
import useAxios from '@/composables/useAxios'

export const useContractVerificationStore = defineStore('useContractVerificationStore', () => {
  const axios = useAxios()
  const result = ref(null)
  const verificationStatus = ref(null)
  const compilerOptions = ref(null)
  const id = ref(null)

  // todo change url

  async function verifyContract(contractId, license, compiler, entryFile, sourceFiles) {
    id.value = null
    result.value = null

    const form = new FormData()
    form.append('license', license)
    form.append('compiler', compiler)
    form.append('entryFile', entryFile)

    for (let i = 0; i < sourceFiles.length; i++) {
      form.append('sourceFiles', sourceFiles.item(i))
    }

    let data

    try {
      data = await axios.post(`http://localhost:3000/contracts/${contractId}`, form)
      console.log('verifyContract data', data)
    } catch (e) {
      console.log('verifyContract e', e.response)
      data = e.response
    }

    id.value = contractId
    result.value = data
    console.log('verifyContract result', result.value)
  }

  async function fetchVerificationStatus(contractId, submissionId) {
    let data
    // todo without let
    try {
      data = await axios.get(`http://localhost:3000/contracts/${contractId}/check/${submissionId}`)
      console.log('fetchVerificationStatus data', data)
    } catch (e) {
      console.log('fetchVerificationStatus e', e.response)
      data = e.response
    }

    verificationStatus.value = data
    console.log(' fetchVerificationStatus verificationStatus', verificationStatus.value)
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
    result,
    verificationStatus,
    verifyContract,
    fetchCompilerOptions,
    compilerOptions,
    id,
  }
})
