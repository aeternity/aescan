import axios from 'axios'
import camelcaseKeysDeep from 'camelcase-keys-deep'

export default defineNuxtPlugin(() => {
  axios.interceptors.response.use(function(response) {
    return { ...response, data: camelcaseKeysDeep(response.data) }
  }, function(error) {
    return Promise.reject(error)
  })
})
