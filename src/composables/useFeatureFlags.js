const useFeatureFlags = () => {
  const {
    DEX_BACKEND_URL,
    CONTRACT_VERIFICATION_SERVICE_URL,
    ENABLE_MARKET_STATS,
    ENABLE_NODES,
  } = useRuntimeConfig().public

  return {
    dex: !!DEX_BACKEND_URL,
    smartContractVerification: !!CONTRACT_VERIFICATION_SERVICE_URL,
    marketStats: !!ENABLE_MARKET_STATS,
    nodes: !!ENABLE_NODES,
  }
}

export default useFeatureFlags
