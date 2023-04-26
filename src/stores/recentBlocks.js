import { defineStore } from 'pinia'
import axios from 'axios'
import { useRuntimeConfig } from 'nuxt/app'
import { adaptDeltaStats, adaptKeyblock, adaptSelectedMicroblockTransactions } from '@/utils/adapters'
import { formatAettosToAe, formatNullable, formatNumber } from '@/utils/format'

const isBlockFirstInSequence = (block, blockSequence) => block.hash === blockSequence?.[0].hash

export const useRecentBlocksStore = defineStore('recentBlocks', {
  state: () => ({
    deltaStats: null,
    keyblocks: null,
    selectedKeyblockMicroblocks: null,
    rawSelectedMicroblockTransactions: null,
    rawSelectedKeyblock: null,
    rawSelectedMicroblock: null,
  }),
  getters: {
    selectedKeyblock: state => {
      return adaptKeyblock(state.rawSelectedKeyblock || state.keyblocks?.[0])
    },
    isFirstKeyblockSelected: state => {
      return isBlockFirstInSequence(state.selectedKeyblock, state.keyblocks)
    },
    isFirstMicroblockSelected: state => {
      return !state.rawSelectedMicroblock ||
        isBlockFirstInSequence(state.rawSelectedMicroblock, state.selectedKeyblockMicroblocks)
    },
    selectedMicroblock: state => {
      return state.rawSelectedMicroblock || state.selectedKeyblockMicroblocks?.[0]
    },
    selectedKeyblockTransactionsCount() {
      return this.selectedKeyblock ? formatNullable(formatNumber(this.selectedKeyblock?.transactions_count)) : ''
    },
    selectedMicroblockTransactions: state => {
      return state.rawSelectedMicroblockTransactions
        ? adaptSelectedMicroblockTransactions(state.rawSelectedMicroblockTransactions)
        : null
    },
    selectedMicroblockTransactionsCount: state => {
      return state.rawSelectedMicroblockTransactions?.data.length || 0
    },
    selectedDeltaStats: state => {
      const selectedKeyblockHeight = state.selectedKeyblock?.height || state.blockHeight
      return state.deltaStats ? adaptDeltaStats(state.deltaStats, selectedKeyblockHeight) : null
    },
    latestReward: state => {
      return state.deltaStats ? formatAettosToAe(state.deltaStats[0].block_reward) : null
    },
    latestBri: state => {
      return state.deltaStats ? formatAettosToAe(state.deltaStats[0].dev_reward) : null
    },
    latestKeyblockTransactionsCount(state) {
      return state.keyblocks?.[0].transactions_count
    },
    blockHeight: state => {
      return state.keyblocks?.[0].height
    },
  },
  actions: {
    async selectKeyblock(keyblock) {
      if (isBlockFirstInSequence(keyblock, this.keyblocks)) {
        this.rawSelectedKeyblock = null
      } else {
        this.rawSelectedKeyblock = keyblock
      }

      if (keyblock?.micro_blocks_count === 0) {
        this.clearSelectedMicroblocksData()
        return
      }

      await this.fetchSelectedKeyblockMicroblocks(keyblock.hash)
      return this.selectMicroblock(this.selectedKeyblockMicroblocks[0])
    },
    selectMicroblock(microblock) {
      if (isBlockFirstInSequence(microblock, this.selectedKeyblockMicroblocks)) {
        this.rawSelectedMicroblock = null
      } else {
        this.rawSelectedMicroblock = microblock
      }

      return this.fetchSelectedMicroblockTransactions()
    },
    clearSelectedMicroblocksData() {
      this.selectedKeyblockMicroblocks = []
      this.rawSelectedMicroblockTransactions = null
    },
    async fetchKeyblocks() {
      const { data } = await axios.get(`${useRuntimeConfig().public.MIDDLEWARE_URL}/v2/key-blocks?&limit=18`)
      this.keyblocks = data.data
    },
    async fetchSelectedMicroblocksInfo() {
      await this.fetchSelectedKeyblockMicroblocks(this.keyblocks[0].hash)
      await this.fetchSelectedMicroblockTransactions()
    },
    async fetchSelectedKeyblockMicroblocks(hash) {
      const { data } = await axios.get(`${useRuntimeConfig().public.MIDDLEWARE_URL}/v2/key-blocks/${hash}/micro-blocks?limit=30`)
      this.selectedKeyblockMicroblocks = data.data
    },
    async fetchSelectedMicroblockTransactions(queryParameters = null) {
      if (!this.selectedMicroblock) {
        return
      }

      const defaultParameters = `/v2/micro-blocks/${this.selectedMicroblock.hash}/txs?limit=4`
      const { data } = await axios.get(`${useRuntimeConfig().public.MIDDLEWARE_URL}${queryParameters || defaultParameters}`)
      this.rawSelectedMicroblockTransactions = data
    },
    async fetchDeltaStats() {
      const { data } = await axios.get(`${useRuntimeConfig().public.MIDDLEWARE_URL}/v2/deltastats?limit=20`)
      this.deltaStats = data.data
    },
  },
})
