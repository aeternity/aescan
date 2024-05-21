import { defineConfig } from 'cypress'

export default defineConfig({
  env: {
    accountAddress: 'ak_gZ55FLJoGEfF5gJ2xJU7j9uSH3fEjoTZq3ygQG8gYA4no6GFW',
    contractAddress: 'ct_s5ZB6cGCqS5QbUboQBK8CWwpknKRSajrt8b1EQRp4t4R5D47e',
    microblockAddress: 'mh_27HKqcut9U9xDwEAf3Lz6evTxY4rfy7odKeSnQaqu45iQesjyj',
    nftAddress: 'ct_2UVjVLvt2NycqbfJWywixyYm68iVvkiVS9wubiQRjp9WeQtfpK',
    transactionAddress: 'th_2Yafj84tsuxskvJnzqGcvthrpDUX8gZE84RXVUwXvkSJxmxbc1',
    oracleAddress: 'ok_2w2Gkp9mwThn6jWdJi5Leuh3P5Zj7oJ6gyoHa8KnKzWwEVSnKf',
    tokenAddress: 'ct_2qyFRzXzTyPCtPKZQ32EPXqxxAcgiWqtADV3amcBVVPYQRKZm7',
    stateChannelAddress: 'ch_2Qo4r6u3Bq1ZMnPL7GpjLLsATaEgMK5BnYnoi68hzLL5QuKbev',
    name: 'testaensrawpointers.chain',
    keyblockId: '947025',
  },
  e2e: {
    baseUrl: 'http://localhost:8080',
    experimentalRunAllSpecs: true,
  },
  viewportWidth: 1280,
  viewportHeight: 720,
  defaultCommandTimeout: 30000,
})
