const { MIDDLEWARE_URL, NODE_URL, PAGINATION_LIMIT } = useRuntimeConfig().public

export function getUrl({ entity, id, route, parameters, limit = PAGINATION_LIMIT, queryParameters, node }) {
  const domain = node ? NODE_URL : MIDDLEWARE_URL
  if (queryParameters) {
    // decode params if encoded
    queryParameters = decodeURIComponent(queryParameters)
    // extract the path from domain
    const path = new URL(domain).pathname
    // if path is in queryParameters, remove it
    if (queryParameters.includes(path)) {
      queryParameters = queryParameters.replace(path, '')
    }
    // strip leading '/' if present
    queryParameters = queryParameters.replace(/^\//, '').replace(/^\?/, '')
    return new URL(`${domain}/${queryParameters}`)
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
