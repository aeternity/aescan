import cache from 'memory-cache'
import useAxios from '@/composables/useAxios'
import {
  CACHE_KEY_RECENT_ACCOUNTS,
  RECENT_ACCOUNTS_CACHE_TTL,
  RECENT_ACCOUNTS_MAX_ACCOUNTS,
  RECENT_ACCOUNTS_WINDOW,
} from '@/utils/constants'

const axios = useAxios()

const PAGE_SIZE = 100
// Spend transactions dominate the chain (a single bot can send most of them), so they are scanned
// separately from the rarer groups, which are walked deeper to still surface the accounts behind them
const TRANSACTION_GROUPS = [
  { group: 'spend', maxPages: 4 },
  { group: 'contract', maxPages: 4 },
  { group: 'name', maxPages: 2 },
  { group: 'oracle', maxPages: 2 },
  { group: 'channel', maxPages: 2 },
  { group: 'ga', maxPages: 2 },
]
// The shared axios instance camel-cases response keys. The field naming the account
// that initiated a transaction differs per transaction type
const INITIATOR_FIELDS = ['senderId', 'accountId', 'callerId', 'ownerId', 'initiatorId', 'fromId', 'gaId', 'payerId']

export default defineEventHandler(async () => {
  let accounts = cache.get(CACHE_KEY_RECENT_ACCOUNTS)
  if (!accounts) {
    accounts = await fetchRecentAccounts()
    cache.put(CACHE_KEY_RECENT_ACCOUNTS, accounts, RECENT_ACCOUNTS_CACHE_TTL)
  }
  return accounts
})

async function fetchRecentAccounts() {
  const since = Date.now() - RECENT_ACCOUNTS_WINDOW
  const results = await Promise.all(
    TRANSACTION_GROUPS.map(({ group, maxPages }) => fetchGroupAccounts(group, maxPages, since)),
  )

  const accounts = new Map()
  results.flat().forEach((account) => {
    const known = accounts.get(account.account)
    if (!known || known.lastActive < account.lastActive) {
      accounts.set(account.account, account)
    }
  })

  return [...accounts.values()]
    .sort((a, b) => b.lastActive - a.lastActive)
    .slice(0, RECENT_ACCOUNTS_MAX_ACCOUNTS)
}

// Walks the newest transactions of a group backwards until the time window is covered,
// keeping the latest transaction of each initiating account
async function fetchGroupAccounts(group, maxPages, since) {
  const accounts = new Map()
  let nextPath = null

  try {
    for (let page = 0; page < maxPages; page++) {
      const url = nextPath
        ? getUrl({ queryParameters: nextPath })
        : getUrl({
            entity: 'transactions',
            parameters: { type_group: group, direction: 'backward' },
            limit: PAGE_SIZE,
          })
      const { data } = await axios.get(url)

      for (const transaction of data.data) {
        if (transaction.microTime < since) {
          return [...accounts.values()]
        }
        const account = findInitiator(transaction.tx)
        if (account && !accounts.has(account)) {
          accounts.set(account, adaptRecentAccount(account, transaction))
        }
      }

      if (!data.next) {
        break
      }
      nextPath = data.next
    }
  } catch {
    // A failing group must not hide the accounts found in the others
  }

  return [...accounts.values()]
}

function findInitiator(tx) {
  const field = INITIATOR_FIELDS.find(name => typeof tx[name] === 'string' && tx[name].startsWith('ak_'))
  return field ? tx[field] : null
}

function adaptRecentAccount(account, transaction) {
  return {
    account,
    lastTxHash: transaction.hash,
    lastTxType: transaction.tx.type,
    lastActive: transaction.microTime,
    lastActiveHeight: transaction.blockHeight,
  }
}
