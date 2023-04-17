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
    messageBuffer: [],
  }),
  getters: {
    selectedKeyblock: state => {
      return adaptKeyblock(state.rawSelectedKeyblock || state.keyblocks?.[0])
    },
    isFirstKeyblockSelected: state => {
      return isBlockFirstInSequence(state.selectedKeyblock, state.keyblocks)
    },
    isFirstMicroblockSelected: state => {
      return !state.rawSelectedMicroblock || isBlockFirstInSequence(state.rawSelectedMicroblock, state.selectedKeyblockMicroblocks)
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
    async processSocketMessage(message) {
      console.debug('message received', message.subscription, message.payload)
      this.messageBuffer.push(message)

      if (this.messageBuffer.length > 30) {
        await this.fetchKeyblocks()
        await Promise.all([
          this.fetchSelectedMicroblocksInfo(),
          this.fetchDeltaStats(),
        ])

        console.debug('### BUFFER CLEARED ###')

        this.messageBuffer = []
        return
      }

      for (let i = this.messageBuffer.length - 1; i >= 0; i--) {
        if (!this.consumeBufferMessage()) {
          break
        }
      }

      console.debug('remaining buffer:', this.messageBuffer.length, this.messageBuffer)
    },
    consumeBufferMessage() {
      console.debug('buffer length', this.messageBuffer.length)
      for (let i = 0; i < this.messageBuffer.length; i++) {
        const message = this.messageBuffer[i]
        let success = false

        switch (message.subscription) {
        case 'KeyBlocks':
          success = this.processKeyblockUpdate(message.payload)
          break
        case 'MicroBlocks':
          success = this.processMicroblockUpdate(message.payload)
          break
        default:
          success = this.processTransactionUpdate(message.payload)
          break
        }

        if (success) {
          console.debug('success:', this.messageBuffer[i].subscription)
          this.messageBuffer.splice(i, 1)
          return true
        }
      }

      return false
    },
    processKeyblockUpdate(keyblock) {
      if (this.keyblocks?.[0].hash !== keyblock.prev_key_hash) {
        return false
      }

      this.keyblocks.unshift({
        transactions_count: 0,
        micro_blocks_count: 0,
        ...keyblock,
      })

      if (this.keyblocks.length > 18) {
        this.keyblocks.pop()
      }

      if (this.isFirstKeyblockSelected) {
        this.selectedKeyblockMicroblocks = []
        this.rawSelectedMicroblock = null
        this.rawSelectedMicroblockTransactions = null
      }

      Promise.all([
        this.fetchKeyblocks(),
        this.fetchDeltaStats(),
        this.fetchBlockchainStats(),
      ])

      return true
    },
    processMicroblockUpdate(microblock) {
      const parentKeyblock = this.keyblocks.find(keyblock => keyblock.height === microblock.height)

      if (!parentKeyblock) {
        return false
      }

      parentKeyblock.micro_blocks_count += 1

      if (microblock.prev_key_hash === this.selectedKeyblock.hash) {
        this.selectedKeyblockMicroblocks.unshift({
          transactions_count: 0,
          ...microblock,
        })

        if (this.selectedKeyblockMicroblocks.length > 30) {
          if (this.selectedKeyblockMicroblocks.pop().hash === this.rawSelectedMicroblock?.hash) {
            this.rawSelectedMicroblock = null
          }
        }

        if (this.isFirstMicroblockSelected) {
          this.rawSelectedMicroblockTransactions = { data: [] }
        }
      }

      return true
    },
    processTransactionUpdate(transaction) {
      const parentKeyblock = this.keyblocks.find(keyblock => keyblock.height === transaction.block_height)

      if (!parentKeyblock) {
        return false
      }

      parentKeyblock.transactions_count += 1

      if (this.selectedKeyblock?.height !== transaction.block_height) {
        return true
      }

      const parentMicroblock = this.selectedKeyblockMicroblocks.find(microblock => microblock.hash === transaction.block_hash)

      if (!parentMicroblock) {
        return false
      }

      parentMicroblock.transactions_count += 1

      if (transaction.block_hash === this.selectedMicroblock?.hash) {
        this.rawSelectedMicroblockTransactions.data.push({
          micro_time: Date.now(),
          ...transaction,
        })
      }

      return true
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
