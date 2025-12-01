const { MIDDLEWARE_URL, NODE_URL, PAGINATION_LIMIT } = useRuntimeConfig().public

export function getUrl({ entity, id, route, parameters, limit = PAGINATION_LIMIT, queryParameters, node }) {
  const domain = node ? NODE_URL : MIDDLEWARE_URL
  const domainUrl = new URL(domain)
  if (queryParameters) {
    const decodedQueryParameters = decodeURIComponent(queryParameters)
    const questionIndex = decodedQueryParameters.indexOf('?')
    let pathSegment = decodedQueryParameters
    let searchSegment = ''
    if (questionIndex >= 0) {
      pathSegment = decodedQueryParameters.slice(0, questionIndex)
      searchSegment = decodedQueryParameters.slice(questionIndex + 1)
    }

    const origin = domainUrl.origin
    const domainPath = domainUrl.pathname.replace(/\/$/, '')

    if (pathSegment.startsWith(origin)) {
      pathSegment = pathSegment.slice(origin.length)
    }
    pathSegment = pathSegment.replace(/^https?:\/\/[^/]+/, '')
    if (domainPath && pathSegment.startsWith(domainPath)) {
      pathSegment = pathSegment.slice(domainPath.length)
    }
    pathSegment = pathSegment.replace(/^\/+/, '')

    const normalizedDomain = domain.replace(/\/$/, '')
    const url = new URL(normalizedDomain)
    if (pathSegment) {
      url.pathname = `${url.pathname.replace(/\/$/, '')}/${pathSegment}`
    }
    if (searchSegment) {
      url.search = searchSegment
    }
    return url
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
