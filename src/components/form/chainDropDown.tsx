'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAccount, useSwitchChain } from 'wagmi'
import { mainnet, sepolia } from '@wagmi/core/chains'
import { useEffect, useState } from 'react'

export default function ChainDropDown() {
  const { chain } = useAccount()
  const { switchChain } = useSwitchChain({})
  const [connectedChain, setConnectedChain] = useState(
    chain ? chain.id : mainnet.id
  )

  const switchNetwork = (chainId: number) => {
    switchChain({ chainId })
    setConnectedChain(chainId)
  }

  useEffect(() => {
    if (!chain) return
    setConnectedChain(chain.id)
  }, [chain])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-gray-800 hover:bg-gray-800/70 text-zinc-200 p-4 rounded-xl">
        {connectedChain === 1 ? 'Etherum' : 'Sepolia'}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-gray-800 text-zinc-200 p-4 rounded-xl">
        <DropdownMenuItem
          onClick={() => {
            switchNetwork(mainnet.id)
          }}
        >
          Etherum
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            switchNetwork(sepolia.id)
          }}
        >
          Sepolia (testnet)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
