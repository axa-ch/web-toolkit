import HappyPack from 'happypack'

const threadPool = HappyPack.ThreadPool({ size: 5 })
const env = process.env.NODE_ENV

export const getEnvId = (id) => `${env}-${id}`
const createHappyPlugin = (id, loaders) => new HappyPack({
  id: getEnvId(id),
  loaders,
  threadPool,

  // disable happy caching with HAPPY_CACHE=0
  cache: process.env.HAPPY_CACHE !== '0',

  // make happy more verbose with HAPPY_VERBOSE=1
  verbose: process.env.HAPPY_VERBOSE === '1',
})

export default createHappyPlugin
