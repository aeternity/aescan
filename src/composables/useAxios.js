import axios from 'axios'
import camelcaseKeysDeep from 'camelcase-keys-deep'
import { shallowRef } from 'vue'

const axiosInstance = shallowRef(null)

const useAxios = () => {
  const { DEBUG_MODE } = useRuntimeConfig().public

  if (!axiosInstance.value) {
    axiosInstance.value = axios.create()

    axiosInstance.value.interceptors.response.use(function(response) {
      return { ...response, data: camelcaseKeysDeep(response.data) }
    }, function(error) {
      return Promise.reject(error)
    })

    if (!DEBUG_MODE) {
      return axiosInstance.value
    }

    axiosInstance.value.interceptors.request.use(request => {
      request.ts = performance.now()
      return request
    })

    axiosInstance.value.interceptors.response.use(response => {
      const method = response.config.method.toUpperCase()
      const url = response.config.url
      const time = Number(performance.now() - response.config.ts).toFixed()
      console.debug(`Request [${method}] ${url} took ${time} ms to execute.`)
      return response
    })
  }

  return axiosInstance.value
}

export default useAxios
