const { MIDDLEWARE_URL, NODE_URL, PAGINATION_LIMIT } = useRuntimeConfig().public

export function getUrl({ entity, id, route, parameters, limit = PAGINATION_LIMIT, queryParameters, node }) {
  const domain = node ? NODE_URL : MIDDLEWARE_URL
  if (queryParameters) {
    return new URL(`${domain}${queryParameters.substr(3)}`)
  } else {
    const slug = `/${entity}${id ? `/${id}` : ''}${route ? `/${route}` : ''}`
    const url = new URL(`${domain}${slug}`)

    if (parameters) {
      Object.entries(parameters).forEach(([key, value]) => {
        if (value) {
          url.searchParams.append(key, value)
        }
      })
    }

    if (limit) {
      url.searchParams.append('limit', limit)
    }
    return decodeURIComponent(url.toString())
  }
}
