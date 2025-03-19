import useAxios from '@/composables/useAxios'
import { formatAettosToAe, formatBlockDiffAsDatetime, formatIsAuction } from '@/utils/format'

const axios = useAxios()

export default defineEventHandler(async() => {
  const [names, latestKeyblock] = await Promise.all([
    fetchNames(),
    fetchLatestKeyblock(),
  ])
  return adaptNames(names, latestKeyblock)
})

async function fetchLatestKeyblock() {
  const url = getUrl({
    entity: 'key-blocks',
    limit: 1,
  })
  const { data } = await axios.get(url)
  return data.data[0].height
}

async function fetchNames() {
  const url = getUrl({
    entity: 'names',
    parameters: { state: 'active', by: 'activation', direction: 'backward' },
    limit: 4,
  })
  const { data } = await axios.get(url)
  return data.data
}

function adaptNames(names, blockHeight) {
  return names.map(name => {
    return {
      name: name.name,
      address: name.ownership.current,
      activatedHeight: name.activeFrom,
      activated: formatBlockDiffAsDatetime(
        name.activeFrom,
        blockHeight),
      isAuction: formatIsAuction(name.name),
      price: formatAettosToAe(name.nameFee),
    }
  })
}
