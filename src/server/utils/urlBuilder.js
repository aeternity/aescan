const { MIDDLEWARE_URL, PAGINATION_LIMIT } = useRuntimeConfig().public

export function getUrl({ entity, id, route, parameters, limit = PAGINATION_LIMIT, queryParameters }) {
  if (queryParameters) {
    return new URL(`${MIDDLEWARE_URL}${queryParameters.substr(3)}`)
  } else {
    const slug = `/${entity}${id ? `/${id}` : ''}${route ? `/${route}` : ''}`
    const url = new URL(`${MIDDLEWARE_URL}${slug}`)

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
