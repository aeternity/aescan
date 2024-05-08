import { defineConfig } from 'cypress'

export default defineConfig({

  env: {
    accountAddress: 'ak_gZ55FLJoGEfF5gJ2xJU7j9uSH3fEjoTZq3ygQG8gYA4no6GFW',
    contractAddress: 'ct_s5ZB6cGCqS5QbUboQBK8CWwpknKRSajrt8b1EQRp4t4R5D47e',
    microblockAddress: 'mh_27HKqcut9U9xDwEAf3Lz6evTxY4rfy7odKeSnQaqu45iQesjyj',
    nftAddress: 'ct_2UVjVLvt2NycqbfJWywixyYm68iVvkiVS9wubiQRjp9WeQtfpK',
    transactionAddress: 'th_2Yafj84tsuxskvJnzqGcvthrpDUX8gZE84RXVUwXvkSJxmxbc1',
    oracleAddress: 'ok_2w2Gkp9mwThn6jWdJi5Leuh3P5Zj7oJ6gyoHa8KnKzWwEVSnKf',
    name: 'kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk.chain',

  },
  e2e: {
    baseUrl: 'http://localhost:8080',
    experimentalRunAllSpecs: true,
    setupNodeEvents(on, config) {
      // console.log('config.env', config.env)

    },
  },
  viewportWidth: 1280,
  viewportHeight: 720,
  defaultCommandTimeout: 30000,
})
