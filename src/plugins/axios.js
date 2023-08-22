import axios from 'axios'
import camelcaseKeysDeep from 'camelcase-keys-deep'

export default defineNuxtPlugin(() => {
  console.log('registered')

  axios.interceptors.response.use(function(response) {
    return { ...response, data: camelcaseKeysDeep(response.data) }
  }, function(error) {
    return Promise.reject(error)
  })

  axios.interceptors.request.use(request => {
    request.ts = performance.now()
    return request
  })

  axios.interceptors.response.use((response) => {
    const method = response.config.method.toUpperCase()
    const url = response.config.url
    const time = Number(performance.now() - response.config.ts).toFixed()
    console.debug(`Request [${method}] ${url} took ${time} ms to execute.`)
    return response
  })
})
