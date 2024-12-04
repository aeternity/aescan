const useFeatureFlags = () => {
  const { SMART_CONTRACT_VERIFICATION_SERVICE_URL, DEX_BACKEND_URL } =
    useRuntimeConfig().public;

  return {
    smartContractVerification: !!SMART_CONTRACT_VERIFICATION_SERVICE_URL,
    dex: !!DEX_BACKEND_URL,
  };
};

export default useFeatureFlags;
