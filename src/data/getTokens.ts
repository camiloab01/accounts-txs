import Moralis from 'moralis'
import { TokenAddress } from '../types/tokenAddress'

const getTokens = async (chain: string, tokens: Array<TokenAddress>) => {
  try {
    if (!Moralis.Core.isStarted) {
      await Moralis.start({
        apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
      })
    }
    const response = await Moralis.EvmApi.token.getMultipleTokenPrices(
      {
        chain,
      },
      {
        tokens,
      }
    )

    return response
  } catch (e) {
    console.error(e)
  }
}

export default getTokens
