const useFeatureFlags = () => {
  const {
    ENABLE_PAGE_COIN,
    ENABLE_FEATURE_DEX,
    ENABLE_PAGE_NODES,
    ENABLE_FEATURE_CONTRACT_VERIFICATION,
    ENABLE_FEATURE_MARKET_STATS,
  } = useRuntimeConfig().public

  return {
    coinPage: !!ENABLE_PAGE_COIN,
    dex: !!ENABLE_FEATURE_DEX,
    nodesPage: !!ENABLE_PAGE_NODES,
    smartContractVerification: !!ENABLE_FEATURE_CONTRACT_VERIFICATION,
    marketStats: !!ENABLE_FEATURE_MARKET_STATS,
  }
}

export default useFeatureFlags
