'use client'

import { Transaction } from '@/types/transaction'
import shortenAddress from '@/util/shortenAddress'
import { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<Transaction>[] = [
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
    accessorKey: 'amount',
    header: () => <div className="text-left text-white">Amount</div>,
    cell: ({ row }) => {
      return (
        <div className="text-sm flex">
          {`${(row.getValue('amount') as string).toLocaleString()} ETH`}
        </div>
      )
    },
  },
  {
    accessorKey: 'sender',
    header: () => <div className="text-left text-white">Sender</div>,
    cell: ({ row }) => {
      return (
        <div className="text-sm">{shortenAddress(row.getValue('sender'))}</div>
      )
    },
  },
  {
    accessorKey: 'receiver',
    header: () => <div className="text-left text-white">Receiver</div>,
    cell: ({ row }) => {
      return (
        <div className="text-sm">
          {shortenAddress(row.getValue('receiver'))}
        </div>
      )
    },
  },
  {
    accessorKey: 'blockNumber',
    header: () => <div className="text-right text-white">Block Number</div>,
    cell: ({ row }) => {
      return (
        <div className="text-sm text-right">
          {Number(row.getValue('blockNumber'))}
        </div>
      )
    },
  },
]
