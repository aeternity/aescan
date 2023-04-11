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
export const MAX_AE_DISTRIBUTION = 536306702.49932
export const SPECIAL_POINTERS_PRESET_KEYS = ['account_pubkey', 'oracle_pubkey', 'contract_pubkey', 'channel']
export const DATETIME_UNITS = [
  'years',
  'months',
  'days',
  'hours',
  'minutes',
  'seconds',
]
export const NUMBER_FRACTION_THRESHOLD = 100000
export const MAXIMUM_FRACTION_DIGITS = 20
export const APP_TITLE_SHORT = 'æScan'
export const APP_TITLE = 'æScan - æternity Blockchain Explorer'
export const APP_DESCRIPTION = 'æScan is a blockchain explorer, analytics platform, and decentralized Smart Contract navigation platform based on æternity'
export const APP_URL = 'https://aescan.io'
export const APP_CREATOR = '@aeternity'
export const MARKET_STATS_CACHE_TTL = 5 /* m */ * 60 /* s */ * 1000 /* ms */
export const CACHE_KEY_MARKET_DATA = 'aeternity-market-data'
export const CACHE_KEY_PRICE_DATA = 'aeternity-price-data'
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
