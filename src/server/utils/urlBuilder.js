const { MIDDLEWARE_URL } = useRuntimeConfig().public

export function getUrl({ entity, id, route, parameters, limit, queryParameters }) {
  // new URL("/tools", "https://www.asyncapi.com")
  // https://www.asyncapi.com/tools

  // todo separate limit
  const url = new URL(
    `${MIDDLEWARE_URL}
    /${entity}
  ${id ? `/${id}` : ''}
  ${route ? `/${route}` : ''}`,
  )

  if (parameters) {
    Object.entries(parameters).forEach(([key, value]) => {
      url.searchParams.append(key, value)
    })
  }

  if (limit) {
    url.searchParams.append('limit', limit)
  }

  const initialUrl = decodeURIComponent(url.toString())
  const cursorUrl = queryParameters ? `${MIDDLEWARE_URL}${queryParameters.substr(3)}` : null
  // todo conditional return
  // todo make it url
  return cursorUrl || initialUrl
}
