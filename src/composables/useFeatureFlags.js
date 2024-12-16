const useFeatureFlags = () => {
  const {
    IS_HYPERCHAIN,
  } = useRuntimeConfig().public

  return {
    isHyperchain: !!IS_HYPERCHAIN,
  }
}

export default useFeatureFlags
