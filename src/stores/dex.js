import { defineStore } from 'pinia'
import { MAXIMUM_FRACTION_DIGITS } from '@/utils/constants'

export const useDexStore = defineStore('dex', () => {

  async function fetchPrice(tokenId, tokenDecimals = MAXIMUM_FRACTION_DIGITS) {
    // todo why there is no store state varaiable
    const data = await $fetch(`/api/dex/prices`, { params: { tokenId, tokenDecimals } })
    // todo tokenDecimals is it neccessary to pass?
    return data
  }

  return {
    fetchPrice,
  }
})
