export default function useLoading() {
  const nuxtApp = useNuxtApp()
  const isLoading = ref(true)

  nuxtApp.hook('page:start', () => {
    isLoading.value = true
  })
  nuxtApp.hook('page:finish', () => {
    isLoading.value = false
  })
  return { isLoading }
}
