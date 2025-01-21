import { useMarketStatsStore } from '@/stores/marketStats'
import { useRecentBlocksStore } from '@/stores/recentBlocks'
import { useStatus } from '@/stores/status'
import { useConfigStore } from '@/stores/config'

export async function initializeStores() {
  const { fetchKeyblocks } = useRecentBlocksStore()
  const { fetchStatus } = useStatus()
  const { fetchMarketStats } = useMarketStatsStore()
  const { fetchCurrency } = useConfigStore()

  try {
    await Promise.all([
      fetchCurrency(),
      fetchKeyblocks(),
      fetchStatus(),
      fetchMarketStats(),
    ])
  } catch (error) {
    console.error(error)
    return undefined
  }

  return true
}
