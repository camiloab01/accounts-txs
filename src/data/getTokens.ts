import Moralis from 'moralis'
import { TokenAddress } from '../types/tokenAddress'

const getTokens = async (chain: string, tokens: Array<TokenAddress>) => {
  try {
    if (!Moralis.Core.isStarted) {
      //TODO: Move API KEY to Env
      await Moralis.start({
        apiKey:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImEwOWVhY2FlLTcwODItNGQ4Ni05ODgzLWZjYjcxODIwZGE1MyIsIm9yZ0lkIjoiNDAzNjYwIiwidXNlcklkIjoiNDE0Nzg4IiwidHlwZUlkIjoiYzBhNGY1ZGEtOTM5Yy00NTBkLWI5ZTgtN2ExNTY4MDM0YzZmIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MjMwNTUzODgsImV4cCI6NDg3ODgxNTM4OH0.A_dOBgRX3knQNV1VVwoppW7l3G9MCRuiakxoVmHPhj8',
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
