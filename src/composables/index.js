import { useMarketStatsStore } from '@/composables/marketStats'
import { useRecentBlocksStore } from '@/composables/recentBlocks'
import { useStatus } from '@/composables/status'
import { useConfigStore } from '@/composables/config'

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
