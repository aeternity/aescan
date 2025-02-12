const { MIDDLEWARE_URL } = useRuntimeConfig().public

export function getUrl({ baseUrl, id, parameters, queryParameters }) {
  const idd = id ? `/${id}` : ''
  const url = new URL(`${MIDDLEWARE_URL}/${baseUrl}${idd}`)

  if (parameters) {
    Object.entries(parameters).forEach(([key, value]) => {
      url.searchParams.append(key, value)
    })
  }
  console.log('url', url)
  return new URL(queryParameters || decodeURIComponent(url.toString()))
  // todo double URL
}
