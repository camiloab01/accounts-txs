import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { cookieStorage, createStorage } from 'wagmi'
import { sepolia, mainnet } from 'wagmi/chains'

//TODO: Move to an ENV file
export const projectId = process.env.NEXT_PUBLIC_WALLECTCONNECT_KEY

const metadata = {
  name: 'Accounts and Txs',
  description: 'Playground for wagmi and Validation Cloud Node API',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
}

export const config = defaultWagmiConfig({
  chains: [sepolia, mainnet],
  projectId: projectId ?? '',
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
})
