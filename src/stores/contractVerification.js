import { defineStore } from 'pinia'
import useAxios from '@/composables/useAxios'

export const useContractVerificationStore = defineStore('useContractVerificationStore', () => {
  const axios = useAxios()
  const result = ref(null)
  const compilerOptions = ref(null)

  async function verifyContract(contractId, license, compiler, entryFile, sourceFiles) {
    result.value = null
    const form = new FormData()
    form.append('license', license)
    form.append('compiler', compiler)
    form.append('entryFile', entryFile)
    form.append('sourceFiles', sourceFiles[0])

    const { data } = await axios.post(`http://localhost:3000/contracts/${contractId}`, form)
      .then(function(response) {
        console.log(response)
      })
      .catch(function(error) {
        console.log(error)
      })

    console.log('data', data)
    result.value = data
  }

  async function fetchCompilerOptions() {
    compilerOptions.value = null
    const { data } = await axios.get('http://localhost:3000/compilers/')
    console.log('data.compilers', data.compilers)
    const compilersObject = data.compilers.map((item, index) => {
      return { key: index, value: item }
    })
    // todo move to adaptors
    compilerOptions.value = compilersObject
  }

  return {
    verifyContract,
    fetchCompilerOptions,
    compilerOptions,
  }
})
