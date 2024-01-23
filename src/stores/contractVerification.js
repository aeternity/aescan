import { defineStore } from 'pinia'
import useAxios from '@/composables/useAxios'

export const useContractVerificationStore = defineStore('useContractVerificationStore', () => {
  const axios = useAxios()
  const result = ref(null)
  const checkResult = ref(null)
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
      console.log('111 data', data)
    } catch (e) {
      console.log('111 e', e.response)
      data = e.response
    }

    id.value = contractId
    result.value = data
    console.log('result.value', result.value)
  }

  async function fetchVerificationCheck(contractId, submissionId) {
    let data
    // todo without let
    try {
      data = await axios.get(`http://localhost:3000/contracts/${contractId}/check/${submissionId}`)
      console.log('111 data', data)
    } catch (e) {
      console.log('111 e', e.response)
      data = e.response
    }

    console.log('222 fetchVerificationCheck data', data)
    checkResult.value = data
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
    fetchVerificationCheck,
    result,
    checkResult,
    verifyContract,
    fetchCompilerOptions,
    compilerOptions,
    id,
  }
})
