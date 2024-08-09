'use client'

import shortenAddress from '@/util/shortenAddress'
import { ColumnDef } from '@tanstack/react-table'
import { AssetTransfersResult } from 'alchemy-sdk'

export const columns: ColumnDef<AssetTransfersResult>[] = [
  {
    accessorKey: 'hash',
    header: () => <div className="text-left text-white">Hash</div>,
    cell: ({ row }) => {
      return (
        <div className="text-sm">{shortenAddress(row.getValue('hash'))}</div>
      )
    },
  },
  {
    accessorKey: 'value',
    header: () => <div className="text-left text-white">Amount</div>,
    cell: ({ row }) => {
      return (
        <div className="text-sm flex">
          {`${(row.getValue('value') as string).toLocaleString()} ETH`}
        </div>
      )
    },
  },
  {
    accessorKey: 'from',
    header: () => <div className="text-left text-white">Sender</div>,
    cell: ({ row }) => {
      return (
        <div className="text-sm">{shortenAddress(row.getValue('from'))}</div>
      )
    },
  },
  {
    accessorKey: 'to',
    header: () => <div className="text-left text-white">Receiver</div>,
    cell: ({ row }) => {
      return <div className="text-sm">{shortenAddress(row.getValue('to'))}</div>
    },
  },
  {
    accessorKey: 'blockNum',
    header: () => <div className="text-right text-white">Block Number</div>,
    cell: ({ row }) => {
      return (
        <div className="text-sm text-right">
          {Number(row.getValue('blockNum'))}
        </div>
      )
    },
  },
]
