'use client'

import { Token } from '@/types/token'
import shortenAddress from '@/util/shortenAddress'
import { ColumnDef } from '@tanstack/react-table'
import { ExternalLinkIcon } from '@radix-ui/react-icons'
import Image from 'next/image'

export const columns: ColumnDef<Token>[] = [
  {
    accessorKey: 'tokenLogo',
    header: () => <div className="text-left text-white"></div>,
    cell: ({ row }) => {
      return (
        <div>
          <Image
            width={20}
            height={20}
            src={row.getValue('tokenLogo')}
            alt="token logo"
          ></Image>
        </div>
      )
    },
  },
  {
    accessorKey: 'tokenName',
    header: () => <div className="text-left text-white">Name</div>,
    cell: ({ row }) => {
      return <div className="text-sm flex">{row.getValue('tokenName')}</div>
    },
  },
  {
    accessorKey: 'tokenSymbol',
    header: () => <div className="text-left text-white">Symbol</div>,
    cell: ({ row }) => {
      return <div className="text-sm">{row.getValue('tokenSymbol')}</div>
    },
  },
  {
    accessorKey: 'tokenAddress',
    header: () => <div className="text-left text-white">Contract Address</div>,
    cell: ({ row }) => {
      return (
        <div className="text-sm">
          {shortenAddress(row.getValue('tokenAddress'))}
        </div>
      )
    },
  },
  {
    accessorKey: 'priceUSD',
    header: () => <div className="text-right text-white">Price (USD)</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right text-sm">
          {(row.getValue('priceUSD') as Number).toLocaleString()}
        </div>
      )
    },
  },
  {
    accessorKey: 'tokenAddress',
    header: () => <div className="text-right text-white"></div>,
    cell: ({ row }) => {
      return (
        <div className="flex justify-end text-indigo-500 hover:text-white hover:cursor-pointer">
          <a
            href={`https://etherscan.io/token/${row.getValue('tokenAddress')}`}
            target="_blank"
          >
            <ExternalLinkIcon />
          </a>
        </div>
      )
    },
  },
]
