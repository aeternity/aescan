import cache from 'memory-cache'
import {
  CACHE_KEY_COINSTORE_MARKET_DATA,
  CACHE_KEY_COINW_MARKET_DATA,
  CACHE_KEY_GATE_MARKET_DATA,
  CACHE_KEY_HOTCOIN_MARKET_DATA,
  CACHE_KEY_MEXC_MARKET_DATA,
  MARKET_STATS_CACHE_TTL,
  MARKET_STATS_COINSTORE_ADDRESS,
  MARKET_STATS_COINW_ADDRESS,
  MARKET_STATS_GATE_ADDRESS,
  MARKET_STATS_HOTCOIN_ADDRESS,
  MARKET_STATS_MEXC_ADDRESS,
} from '~/utils/constants'

export default defineEventHandler(async() => {
  const [gate, mexc, coinstore, hotcoin, coinw] = await Promise.all([
    fetchGate(),
    fetchMexc(),
    fetchCoinstore(),
    fetchHotcoin(),
    fetchCoinw(),
  ])
  console.log('gate, mexc, coinstore, hotcoin, coinw', gate, mexc, coinstore, hotcoin, coinw)
  return { gate, mexc, coinstore, hotcoin, coinw }
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

async function fetchCoinstore() {
  let marketData = cache.get(CACHE_KEY_COINSTORE_MARKET_DATA)
  if (!marketData) {
    const response = await $fetch(MARKET_STATS_COINSTORE_ADDRESS)
    marketData = adaptCoinStore(response)
    cache.put(CACHE_KEY_COINSTORE_MARKET_DATA, marketData, MARKET_STATS_CACHE_TTL)
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
    price: stats[0].last,
    volume: stats[0].base_volume,
  }
}

function adaptMexc(stats) {
  return {
    price: stats.lastPrice,
    volume: stats.volume,
  }
}

function adaptCoinStore(stats) {
  const tokenPair = stats.data.find(item => item.symbol === 'AEUSDT')
  return {
    price: tokenPair.close,
    volume: tokenPair.volume,
  }
}

function adaptHotCoin(stats) {
  const tokenPair = stats.ticker.find(item => item.symbol === 'ae_usdt')
  return {
    price: tokenPair.last,
    volume: tokenPair.vol,
  }
}

function adaptCoinW(stats) {
  return {
    price: stats.data.AE_USDT.last,
    volume: stats.data.AE_USDT.baseVolume,
  }
}
