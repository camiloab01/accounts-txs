'use client'

import shortenAddress from '@/util/shortenAddress'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount } from 'wagmi'

export default function ConnectButton() {
  const { open } = useWeb3Modal()
  const { address, isConnected } = useAccount()

  return (
    <button
      className="bg-blue-600 hover:bg-blue-600/70 text-white font-bold rounded-full w-36"
      onClick={() => open()}
    >
      {isConnected ? shortenAddress(address) : 'Connect Wallet'}
    </button>
  )
}
