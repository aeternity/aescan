# Aeternity Node API — agent reference
Base: `NODE_URL` env (`https://mainnet.aeternity.io/v3` / `https://testnet.aeternity.io/v3`)
Response objects vary; only `strategy`, `from`, `limit`, `type` are documented query params.

---

## Accounts
`GET /accounts/{pubkey}` → account object
`GET /accounts/{pubkey}/hash/{hash}` → account at tx hash
`GET /accounts/{pubkey}/height/{height}` → account at height
`GET /accounts/{pubkey}/next-nonce` strategy=max|continuity(=max) → {nextNonce}
`GET /accounts/{pubkey}/transactions/pending` → pending txs

## Contracts
`GET /contracts/{pubkey}` → contract object
`GET /contracts/{pubkey}/code` → {bytecode}
`GET /contracts/{pubkey}/poi` → proof of inclusion
`POST /dry-run` → dry-run result

## Channels
`GET /channels/{pubkey}` → channel object

## Transactions
`POST /transactions` → {txHash}
`GET /transactions/{hash}` → transaction object
`GET /transactions/{hash}/info` → call info / result

## Keyblocks
`GET /key-blocks/current` → current keyblock
`GET /key-blocks/current/hash` → {hash}
`GET /key-blocks/current/height` → {height}
`GET /key-blocks/pending` → pending keyblock
`GET /key-blocks/hash/{hash}` → keyblock
`GET /key-blocks/height/{height}` → keyblock

## Microblocks
`GET /micro-blocks/hash/{hash}/header` → microblock header
`GET /micro-blocks/hash/{hash}/transactions` → {transactions:[]}
`GET /micro-blocks/hash/{hash}/transactions/count` → {count}
`GET /micro-blocks/hash/{hash}/transactions/index/{index}` → single tx

## Generations
`GET /generations/current` → {keyBlock, microBlocks}
`GET /generations/hash/{hash}` → generation
`GET /generations/height/{height}` → generation

## Names
`GET /names/{name}` → name object
`GET /names/hash/{name_hash}` → name object
`GET /auctions/{name}` → auction info

## Oracles
`GET /oracles/{pubkey}` → oracle object
`GET /oracles/{pubkey}/queries` from=string,limit=integer(=20),type=open|closed|all(=all) → queries
`GET /oracles/{pubkey}/queries/{query-id}` → single query

## Chain / Status
`GET /headers/top` → top header
`GET /status` → {networkId,syncProgress,topBlockHeight,…}
`GET /status/chain-ends` → fork tips
`GET /sync-status` → {syncing,progress}
`GET /currency` → {currency,…}
`GET /recent-gas-prices` → gas price history
`GET /peers/pubkey` → node peer pubkey
