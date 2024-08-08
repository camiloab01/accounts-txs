import { Alchemy, AssetTransfersCategory, Network } from 'alchemy-sdk'

const getAccountTransactions = async (account: string) => {
  const config = {
    apiKey: '1VewTipkrY4bYqgH4BboxtRqa7thKT0E',
    network: Network.ETH_SEPOLIA,
  }
  const alchemy = new Alchemy(config)

  const data = await alchemy.core.getAssetTransfers({
    fromAddress: account,
    category: [
      AssetTransfersCategory.EXTERNAL,
      AssetTransfersCategory.INTERNAL,
      AssetTransfersCategory.ERC20,
      AssetTransfersCategory.ERC721,
      AssetTransfersCategory.ERC1155,
    ],
  })

  return data
}

export default getAccountTransactions
