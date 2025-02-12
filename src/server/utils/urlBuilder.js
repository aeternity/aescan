const { MIDDLEWARE_URL } = useRuntimeConfig().public

export function getUrl({ baseUrl, parameters, queryParameters }) {
  const url = new URL(`${MIDDLEWARE_URL}/${baseUrl}`)

  Object.entries(parameters).forEach(([key, value]) => {
    url.searchParams.append(key, value)
  })

  return queryParameters || url
}
