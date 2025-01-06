import {defineConfig} from 'cypress'

export default defineConfig({
  env: {
    accountAddress: 'ak_gZ55FLJoGEfF5gJ2xJU7j9uSH3fEjoTZq3ygQG8gYA4no6GFW',
    generalizedAccountAddress: 'ak_2Eyn25BLZ4326wdjnrpV9wERhvDwU7b7LWmuWC3HzqNpqAf4GH',
    contractAddress: 'ct_s5ZB6cGCqS5QbUboQBK8CWwpknKRSajrt8b1EQRp4t4R5D47e',
    microblockAddress: 'mh_27HKqcut9U9xDwEAf3Lz6evTxY4rfy7odKeSnQaqu45iQesjyj',
    nftAddress: 'ct_2UVjVLvt2NycqbfJWywixyYm68iVvkiVS9wubiQRjp9WeQtfpK',
    transactionAddress: 'th_2g4RMEbA6avWtuQnYgG6Jgc2n2RhPyhLTvdiwdgrgYjLcJmeH2',
    oracleAddress: 'ok_2w2Gkp9mwThn6jWdJi5Leuh3P5Zj7oJ6gyoHa8KnKzWwEVSnKf',
    tokenAddress: 'ct_2qyFRzXzTyPCtPKZQ32EPXqxxAcgiWqtADV3amcBVVPYQRKZm7',
    stateChannelAddress: 'ch_2Qo4r6u3Bq1ZMnPL7GpjLLsATaEgMK5BnYnoi68hzLL5QuKbev',
    chainName: 'testaensrawpointers.chain',
    name: 'testaensrawpointers',
    nameAddress: 'nm_2LvDCeiCTGk8mBXqRPmdnb3MgGUcvmfBRRAxgsgsa21GDW9FSR',
    keyblockHeight: '947025',
    keyblockAddress: 'kh_2K9dmFN6Qv5N18JbzXfmNMyFaZ9J5tSnHHwwNALEFRusykeTXY',
    notFoundAccount: 'ak_2iBPH7HUz3cSDVEUWiHg76MZJ6tZooVNBmmxcgVK6VV8KAE689',
    existentAccount: 'ak_8HDkjUz23gARqED4oRk6nShpY3YYPUA3tb4pbPcqKxXNHYqno',
    futureKeyblockHeight: '99999999',
    retries: 2
  },
  e2e: {
    baseUrl: 'http://localhost:8080',
    experimentalRunAllSpecs: true,
  },
  viewportWidth: 1280,
  viewportHeight: 720,
  defaultCommandTimeout: 180000,
})
