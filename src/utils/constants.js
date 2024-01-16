export const MARKET_STATS_ADDRESS = 'https://api.coingecko.com/api/v3'
export const MINUTES_PER_BLOCK = 3
export const TX_TYPES_OPTIONS = [
  { typeQuery: null, label: 'All types' },
  { typeQuery: 'spend', label: 'SpendTx' },
  { typeQuery: 'contract_call', label: 'ContractCallTx' },
  { typeQuery: 'contract_create', label: 'ContractCreateTx' },
  { typeQuery: 'oracle_register', label: 'OracleRegisterTx' },
  { typeQuery: 'oracle_query', label: 'OracleQueryTx' },
  { typeQuery: 'oracle_response', label: 'OracleRespondTx' },
  { typeQuery: 'oracle_extend', label: 'OracleExtendTx' },
  { typeQuery: 'name_preclaim', label: 'NamePreclaimTx' },
  { typeQuery: 'name_claim', label: 'NameClaimTx' },
  { typeQuery: 'name_update', label: 'NameUpdateTx' },
  { typeQuery: 'name_transfer', label: 'NameTransferTx' },
  { typeQuery: 'name_revoke', label: 'NameRevokeTx' },
  { typeQuery: 'channel_create', label: 'ChannelCreateTx' },
  { typeQuery: 'channel_deposit', label: 'ChannelDepositTx' },
  { typeQuery: 'channel_withdraw', label: 'ChannelWithdrawTx' },
  { typeQuery: 'channel_close_mutual', label: 'ChannelCloseMutualTx' },
  { typeQuery: 'channel_close_solo', label: 'ChannelCloseSoloTx' },
  { typeQuery: 'channel_slash', label: 'ChannelSlashTx' },
  { typeQuery: 'channel_settle', label: 'ChannelSettleTx' },
  { typeQuery: 'channel_snapshot_solo', label: 'ChannelSnapshotSoloTx' },
  { typeQuery: 'channel_force_progress', label: 'ChannelForceProgressTx' },
  { typeQuery: 'ga_attach', label: 'GAAttachTx' },
  { typeQuery: 'ga_meta', label: 'GAMetaTx' },
  { typeQuery: 'paying_for', label: 'PayingForTx' },
]
export const ORACLE_STATES_OPTIONS = [
  { stateQuery: 'active', label: 'Active' },
  { stateQuery: 'inactive', label: 'Inactive' },
]
export const TOKEN_TYPES_OPTIONS = [
  { label: 'Listed', key: 'listedTokens' },
  { label: 'All Tokens', key: 'allTokens' },
]

export const LICENSE_TYPE_OPTIONS = [
  { label: 'License A', key: 'a' },
  { label: 'License B', key: 'b' },
]
export const MAX_AE_DISTRIBUTION = 536306702.49932
export const SPECIAL_POINTERS_PRESET_KEYS = ['accountPubkey', 'oraclePubkey', 'contractPubkey', 'channel']
export const DATETIME_UNITS = [
  'years',
  'months',
  'days',
  'hours',
  'minutes',
  'seconds',
]
export const NUMBER_FRACTION_THRESHOLD = 100000
export const MAXIMUM_FRACTION_DIGITS = 18
export const APP_TITLE_SHORT = 'æScan'
export const APP_TITLE = 'æScan - æternity Blockchain Explorer'
export const APP_DESCRIPTION = 'æScan is a blockchain explorer, analytics platform, and decentralized Smart Contract navigation platform based on æternity.'
export const APP_KEYWORDS = 'aescan, aeternity, blockchain, explorer, search, crypto, currency'
export const APP_URL = 'https://aescan.io'
export const APP_CREATOR = '@aeternity'
export const MARKET_STATS_CACHE_TTL = 5 /* m */ * 60 /* s */ * 1000 /* ms */
export const CACHE_KEY_MARKET_DATA = 'aeternity-market-data'
export const CACHE_KEY_PRICE_DATA = 'aeternity-price-data'
export const VISIBLE_KEYBLOCKS_LIMIT = 20
export const VISIBLE_MICROBLOCKS_LIMIT = 30
export const VISIBLE_TRANSACTIONS_LIMIT = 4
export const LAEX_CONTRACT_ID = 'ct_xtk8rSz9suPb6D6VLquyfVji25FcnFRDjn3dnn5mmvHsPiESt'

export const TOKEN_SUPPLY_ACI = [
  {
    contract: {
      functions: [
        {
          arguments: [],
          name: 'total_supply',
          payable: false,
          returns: 'int',
          stateful: false,
        },
      ],
      payable: false,
    },
  },
]
export const SWAP_CONTRACT_CALLS = [
  'swap_exact_tokens_for_tokens',
  'swap_tokens_for_exact_tokens',
  'swap_exact_ae_for_tokens',
  'swap_tokens_for_exact_ae',
  'swap_exact_tokens_for_ae',
  'swap_ae_for_exact_tokens',
]
export const ADD_LIQUIDITY_CONTRACT_CALLS = [
  'add_liquidity',
  'add_liquidity_ae',
]
export const REMOVE_LIQUIDITY_CONTRACT_CALLS = [
  'remove_liquidity',
  'remove_liquidity_ae',
]

export const STATISTICS_DATA_BEGINNING = '2018-11-28'

export const KNOWN_ADDRESSES = [
  { hash: 'ak_jgiBUko9fTwg5HQ8nHFoPbjR22TBcg9LK85qsv1mTkcjdszFa', name: 'CoinEx' },
  { hash: 'ak_6sssiKcg7AywyJkfSdHz52RbDUq5cZe4V4hcvghXnrPz4H4Qg', name: 'Gate.io' },
  { hash: 'ak_3oCNr4upswn5sRVpqdpuiCwxqwRU1tok2xLjLLy9vjvYRdVNd', name: 'MEXC' },
  { hash: 'ak_dMyzpooJ4oGnBVX35SCvHspJrq55HAAupCwPQTDZmRDT5SSSW', name: 'WeTrue.io' },
  { hash: 'ak_vKdT14HCiLCxuT3M7vf3QREyUbQTr1u6Pz49ba9EhaD6uDqWs', name: 'Huobi' },
  { hash: 'ak_dnzaNnchT7f3YT3CtrQ7GUjqGT6VaHzPxpf2efHWPuEAWKcht', name: 'Binance' },
  { hash: 'ak_wftXwsMheVNA33YWiYLqFNnSSDnYsV9ynqRSnZT8P3kgZG9bn', name: 'Hotbit' },
  { hash: 'ak_wM8yFU8eSETXU7VSN48HMDmevGoCMiuveQZgkPuRn1nTiRqyv', name: 'WoolyPooly' },
  { hash: 'ak_dArxCkAsk1mZB1L9CX3cdz1GDN4hN84L3Q8dMLHN4v8cU85TF', name: '2miners' },
  { hash: 'ak_9MsbDuBTtKegKpj5uSxfPwmJ4YiN6bBdtXici682DgPk8ycpM', name: '2miners.solo' },
  { hash: 'ak_2KAcA2Pp1nrR8Wkt3FtCkReGzAi8vJ9Snxa4PcmrthVx8AhPe8', name: 'BRI' },
  { hash: 'ct_J3zBY8xxjsRr3QojETNw48Eb38fjvEuJKkQ6KzECvubvEcvCa', name: 'Superhero DEX' },
  { hash: 'ct_azbNZ1XrPjXfqBqbAh1ffLNTQ1sbnuUDFvJrXjYz7JQA1saQ3', name: 'Superhero DEX' },
  { hash: 'ct_2mfj3FoZxnhkSw5RZMcP8BfPoB1QR4QiYGNCdkAvLZ1zfF6paW', name: 'Superhero DEX' },
]
export const REVOKED_PERIOD = 2016
