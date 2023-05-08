import { useMarketStatsStore } from '@/stores/marketStats'
import { useRecentBlocksStore } from '@/stores/recentBlocks'
import { useStatus } from '@/stores/status'

export async function initializeStores() {
  const { fetchKeyblocks } = useRecentBlocksStore()
  const { fetchStatus } = useStatus()
  const { fetchMarketStats } = useMarketStatsStore()

  try {
    await Promise.all([
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
