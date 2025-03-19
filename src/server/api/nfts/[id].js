import useAxios from '@/composables/useAxios'
import { formatTemplateLimit, formatTokenLimit } from '@/utils/format'

const axios = useAxios()

export default defineEventHandler(async event => {
  const id = getRouterParam(event, 'id')

  const url = getUrl({
    entity: 'aex141',
    id,
  })

  const { data } = await axios.get(url)
  return adaptNft(data)
})

function adaptNft(nft) {
  return {
    ...nft,
    tokenLimit: formatTokenLimit(nft.extensions, nft.limits?.tokenLimit),
    templateLimit: formatTemplateLimit(nft.extensions, nft.limits?.templateLimit),
  }
}
