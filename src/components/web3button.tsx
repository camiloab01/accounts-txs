'use client'

import { useWeb3Modal } from '@web3modal/wagmi/react'

export default function ConnectButton() {
  const { open } = useWeb3Modal()

  return (
    <button
      className="bg-blue-600 hover:bg-blue-600/70 text-white font-bold rounded-full p-2"
      onClick={() => open()}
    >
      Connect Wallet
    </button>
  )
}
