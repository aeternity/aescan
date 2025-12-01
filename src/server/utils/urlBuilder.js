const { MIDDLEWARE_URL, NODE_URL, PAGINATION_LIMIT } = useRuntimeConfig().public

export function getUrl({ entity, id, route, parameters, limit = PAGINATION_LIMIT, queryParameters, node }) {
  const domain = node ? NODE_URL : MIDDLEWARE_URL
  if (queryParameters) {
    const decodedQueryParameters = decodeURIComponent(queryParameters)
    const questionIndex = decodedQueryParameters.indexOf('?')
    let pathSegment = decodedQueryParameters
    let searchSegment = ''
    if (questionIndex >= 0) {
      pathSegment = decodedQueryParameters.slice(0, questionIndex)
      searchSegment = decodedQueryParameters.slice(questionIndex + 1)
    }
    const domainPath = new URL(domain).pathname.replace(/\/$/, '')

    let normalizedPath = pathSegment
    normalizedPath = normalizedPath.replace(/^https?:\/\/[^/]+/, '')
    normalizedPath = normalizedPath.replace(/^\/+/, '')
    if (domainPath) {
      const domainPathNoSlash = domainPath.replace(/^\/+/, '')
      while (normalizedPath.startsWith(domainPathNoSlash)) {
        normalizedPath = normalizedPath.slice(domainPathNoSlash.length)
      }
    }
    normalizedPath = normalizedPath.replace(/^\/+/, '')
    console.log('Normalized Path:', normalizedPath)
    if (normalizedPath.startsWith('v3/')) {
      normalizedPath = normalizedPath.slice(3)
    } else if (normalizedPath === 'v3') {
      normalizedPath = ''
    }

    const url = new URL(domain.replace(/\/$/, ''))
    const basePath = new URL(domain).pathname.replace(/\/$/, '')
    if (normalizedPath) {
      url.pathname = `${basePath}${normalizedPath ? `/${normalizedPath}` : ''}`
    } else {
      url.pathname = basePath
    }
    if (searchSegment) {
      url.search = searchSegment
    }
    return decodeURIComponent(url.toString())
  }

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
