import cache from 'memory-cache'
import {
  CACHE_KEY_COINW_MARKET_DATA,
  CACHE_KEY_GATE_MARKET_DATA,
  CACHE_KEY_HOTCOIN_MARKET_DATA,
  CACHE_KEY_MEXC_MARKET_DATA,
  MARKET_STATS_CACHE_TTL,
  MARKET_STATS_COINW_ADDRESS,
  MARKET_STATS_GATE_ADDRESS,
  MARKET_STATS_HOTCOIN_ADDRESS,
  MARKET_STATS_MEXC_ADDRESS,
} from '@/utils/constants'

export default defineEventHandler(async () => {
  const [gate, mexc, hotcoin, coinw] = await Promise.all([
    fetchGate(),
    fetchMexc(),
    fetchHotcoin(),
    fetchCoinw(),
  ])
  return { gate, mexc, hotcoin, coinw }
})

async function fetchGate() {
  let marketData = cache.get(CACHE_KEY_GATE_MARKET_DATA)
  if (!marketData) {
    const response = await $fetch(MARKET_STATS_GATE_ADDRESS)
    marketData = adaptGate(response)
    cache.put(CACHE_KEY_GATE_MARKET_DATA, marketData, MARKET_STATS_CACHE_TTL)
  }
  return marketData
}

async function fetchMexc() {
  let marketData = cache.get(CACHE_KEY_MEXC_MARKET_DATA)
  if (!marketData) {
    const response = await $fetch(MARKET_STATS_MEXC_ADDRESS)
    marketData = adaptMexc(response)
    cache.put(CACHE_KEY_MEXC_MARKET_DATA, marketData, MARKET_STATS_CACHE_TTL)
  }
  return marketData
}

async function fetchHotcoin() {
  let marketData = cache.get(CACHE_KEY_HOTCOIN_MARKET_DATA)
  if (!marketData) {
    const response = await $fetch(MARKET_STATS_HOTCOIN_ADDRESS)
    marketData = adaptHotCoin(response)
    cache.put(CACHE_KEY_HOTCOIN_MARKET_DATA, marketData, MARKET_STATS_CACHE_TTL)
  }
  return marketData
}

async function fetchCoinw() {
  let marketData = cache.get(CACHE_KEY_COINW_MARKET_DATA)
  if (!marketData) {
    const response = await $fetch(MARKET_STATS_COINW_ADDRESS)
    marketData = adaptCoinW(response)
    cache.put(CACHE_KEY_COINW_MARKET_DATA, marketData, MARKET_STATS_CACHE_TTL)
  }
  return marketData
}

function adaptGate(stats) {
  return {
    price: stats[0]?.last,
    volume: stats[0]?.base_volume,
  }
}

function adaptMexc(stats) {
  return {
    price: stats?.lastPrice,
    volume: stats?.volume,
  }
}

function adaptHotCoin(stats) {
  const tokenPair = stats.ticker.find(item => item.symbol === 'ae_usdt')
  return {
    price: tokenPair?.last,
    volume: tokenPair?.vol,
  }
}

function adaptCoinW(stats) {
  return {
    price: stats.data.AE_USDT?.last,
    volume: stats.data.AE_USDT?.baseVolume,
  }
}
