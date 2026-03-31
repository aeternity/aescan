# æScan — agent reference

æScan is an æternity blockchain explorer, analytics platform, and smart contract navigation tool.
Hosted at **aescan.io** (mainnet) and **testnet.aescan.io** (testnet). Network is switchable from the nav.

## Stack
- **Nuxt 3** + Vue 3 + Vite, **SSR enabled**
- **Pinia** stores (composables pattern: `use*Store` in `src/composables/`)
- Server-side BFF routes in `src/server/api/` (Nitro)
- State management: reactive refs, computed, watchers
- Formatting/amounts: `bignumber.js`, `@aeternity/aepp-sdk`
- Wallet connect: `@aeternity/aepp-sdk` (AeSdkAepp)
- Error tracking: Sentry
- Analytics: Plausible
- Monaco editor for contract code

## Dev commands
```
yarn dev          # dev server on :8080 with HMR
yarn build        # production build
yarn start        # serve production build on :80
yarn lint         # lint JS + CSS
yarn lint:fix     # auto-fix lint
yarn e2e          # open Cypress
yarn e2e:run      # run Cypress headless
yarn reinstall    # clean reinstall
```

## External services (env-configured)
| Var | Purpose | Mainnet default |
|-----|---------|----------------|
| `MIDDLEWARE_URL` | ae_mdw REST API v3 | `https://mainnet.aeternity.io/mdw/v3` |
| `NODE_URL` | æternity node REST API v3 | `https://mainnet.aeternity.io/v3` |
| `WEBSOCKET_URL` | ae_mdw websocket | `wss://mainnet.aeternity.io/mdw/v3/websocket` |
| `DEX_BACKEND_URL` | Superhero DEX backend | `https://dex-backend-mainnet.prd.service.aepps.com` |
| `CONTRACT_VERIFICATION_SERVICE_URL` | Smart contract verification | `https://scv-gateway.prd.service.aepps.com` |

Testnet equivalents use `testnet.aeternity.io` and testnet-specific service URLs.

## Proxy routes (Nitro, no CORS needed from client)
- `GET /proxy/avatar/{id}` → `https://avatars.superherowallet.com/{id}`
- `GET /proxy/nodes` → `https://mdw.mainnet.aeternity.io/v3/debug/network`

## Internal BFF API (`src/server/api/`)
These are proxied/adapted calls consumed by the Nuxt frontend. All return camelCased JSON.
```
/api/keyblocks                  GET  list of keyblocks
/api/keyblocks/[id]             GET  keyblock detail
/api/keyblocks/microblocks      GET  microblocks for a keyblock
/api/keyblocks/transactions     GET  transactions for a keyblock (scope=gen:H-H)
/api/microblocks/[id]           GET  microblock detail
/api/microblocks/transactions   GET  transactions for a microblock
/api/channels                   GET  list of channels
/api/channels/[id]              GET  channel detail
/api/channels/count             GET  total channel count
/api/channels/transactions      GET  channel transactions
/api/names/[id]                 GET  name detail
/api/names/active               GET  active names
/api/names/auctions             GET  name auctions
/api/names/expired              GET  expired names
/api/names/history              GET  name history events
/api/names/recent               GET  recently registered names
/api/nfts/[id]                  GET  NFT (AEX-141) collection detail
/api/nfts/index                 GET  list of NFT collections
/api/nfts/inventory             GET  tokens owned by an account
/api/nfts/owners                GET  owners of a collection
/api/nfts/transfers             GET  transfer events
/api/oracles/[id]               GET  oracle detail
/api/oracles/count              GET  total oracle count
/api/oracles/events             GET  oracle events/queries
/api/oracles/index              GET  list of oracles
/api/tokens/ae                  GET  AE coin market/price data
/api/mining/miners              GET  miner stats
/api/mining/statistics          GET  mining statistics
/api/search/names               GET  name search
/api/search/nfts                GET  NFT search
/api/search/tokens              GET  token search
/api/search/is-keyblock-mined   GET  check if keyblock is mined
/api/search/is-name-claimed     GET  check if name is claimed
```

## API references
- `docs/mdw_api_agent.md` — middleware REST API (all 76 endpoints, compact)
- `docs/node_api_agent.md` — node REST API (external endpoints only, compact)
- Full specs: `docs/mdw_api.json`, `docs/node_api.json`

## WebSocket (live data)
URL: `WEBSOCKET_URL` (`wss://mainnet.aeternity.io/mdw/v3/websocket`)
Implemented in `src/composables/webSocket.js`. Auto-reconnects on close.

Subscribe messages (JSON):
```json
{"op":"Subscribe","source":"node","payload":"KeyBlocks"}      // always on
{"op":"Subscribe","source":"node","payload":"MicroBlocks"}    // on keyblock detail page
{"op":"Subscribe","source":"mdw","payload":"<tx_hash>"}       // on tx detail page
```
Events update: block height (dashboard/header), microblock list (keyblock detail), tx confirmation status.

## Feature flags (env)
- `ENABLE_MARKET_STATS` — show AE price/market panel
- `ENABLE_NODES` — show network nodes panel
- `ENABLE_MINING` — show mining stats

## Conventions
- Amounts in `aettos` (1 AE = 10^18 aettos), formatted via `src/utils/format.js`
- Addresses: `ak_` accounts, `ct_` contracts, `kh_` keyblocks, `mh_` microblocks, `th_` transactions, `nm_` names, `ok_` oracles, `ch_` channels
- Pagination: middleware returns `{data, next, prev}` cursor-based; count fetched separately
- All API keys camelCased client-side via `camelcase-keys-deep`
- URL builder: `src/server/utils/urlBuilder.js`
- Tx type constants/options: `src/utils/constants.js`
