const { MIDDLEWARE_URL } = useRuntimeConfig().public

export function getUrl({ entity, id, route, parameters, queryParameters }) {
  const idd = id ? `/${id}` : ''
  const routerr = route ? `/${route}` : ''
  const url = new URL(`${MIDDLEWARE_URL}/${entity}${idd}${routerr}`)

  if (parameters) {
    Object.entries(parameters).forEach(([key, value]) => {
      url.searchParams.append(key, value)
    })
  }
  console.log('url', url.href)
  console.log('==============')
  return new URL(queryParameters || decodeURIComponent(url.toString()))
  // todo double URL
}
