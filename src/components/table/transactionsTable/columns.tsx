'use client'

import shortenAddress from '@/util/shortenAddress'
import { ColumnDef } from '@tanstack/react-table'
import { AssetTransfersResult } from 'alchemy-sdk'

export const columns: ColumnDef<AssetTransfersResult>[] = [
  {
    accessorKey: 'hash',
    header: 'Hash',
    cell: ({ row }) => {
      return (
        <div className="text-sm">{shortenAddress(row.getValue('hash'))}</div>
      )
    },
  },
  {
    accessorKey: 'value',
    header: 'Amount',
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
    header: 'Sender',
    cell: ({ row }) => {
      return (
        <div className="text-sm">{shortenAddress(row.getValue('from'))}</div>
      )
    },
  },
  {
    accessorKey: 'to',
    header: 'Receiver',
    cell: ({ row }) => {
      return <div className="text-sm">{shortenAddress(row.getValue('to'))}</div>
    },
  },
  {
    accessorKey: 'blockNum',
    header: 'Block Number',
    cell: ({ row }) => {
      return (
        <div className="text-sm text-right">
          {Number(row.getValue('blockNum'))}
        </div>
      )
    },
  },
]
