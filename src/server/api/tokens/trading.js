import axios from 'axios'

export default defineEventHandler(async() => {
  const [pairs, tokens] = await Promise.all([
    fetchTradingPairs(),
    fetchTokens(),

  ])
  console.log('pairs, tokens', pairs, tokens)
  return { pairs, tokens }
})

async function fetchTradingPairs() {
  const { data } = await axios.get('https://dex-backend-testnet.prd.service.aepps.com/pairs?only-listed=false')
  return data
}

async function fetchTokens() {
  const { data } = await axios.get('https://dex-backend-testnet.prd.service.aepps.com/tokens')
  return data
}
