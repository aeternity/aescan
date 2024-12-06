import { useMarketStatsStore } from '@/stores/marketStats'
import { useRecentBlocksStore } from '@/stores/recentBlocks'
import { useStatus } from '@/stores/status'
import { useAppStore } from '@/stores/app'

export async function initializeStores() {
  const { fetchKeyblocks } = useRecentBlocksStore()
  const { fetchStatus } = useStatus()
  const { fetchMarketStats } = useMarketStatsStore()
  const { fetchCurrency } = useAppStore()

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
