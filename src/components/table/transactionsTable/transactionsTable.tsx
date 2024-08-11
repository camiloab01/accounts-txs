'use client'

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Transaction } from '@/types/transaction'
import shortenAddress from '@/util/shortenAddress'
import { ExternalLinkIcon } from '@radix-ui/react-icons'
import {
  ColumnDef,
  flexRender,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { createColumnHelper, getCoreRowModel } from '@tanstack/table-core'
import { useMemo } from 'react'

export const TransactionsTable = ({
  transactionsData,
}: {
  transactionsData: Transaction[]
}) => {
  const columnHelper = createColumnHelper<Transaction>()

  const columns = useMemo(
    () => [
      columnHelper.accessor((x) => x.hash, {
        id: 'hash',
        header: () => <div className="text-left text-white">Hash</div>,
        cell: ({ row }) => {
          return (
            <div className="text-sm">
              {shortenAddress(row.getValue('hash'))}
            </div>
          )
        },
      }),
      columnHelper.accessor((x) => x.amount, {
        id: 'amount',
        header: () => <div className="text-left text-white">Amount</div>,
        cell: ({ row }) => {
          return (
            <div className="text-sm flex">
              {`${(row.getValue('amount') as string).toLocaleString()} ETH`}
            </div>
          )
        },
      }),
      columnHelper.accessor((x) => x.sender, {
        id: 'sender',
        header: () => <div className="text-left text-white">Sender</div>,
        cell: ({ row }) => {
          return (
            <div className="text-sm">
              {shortenAddress(row.getValue('sender'))}
            </div>
          )
        },
      }),
      columnHelper.accessor((x) => x.receiver, {
        id: 'receiver',
        header: () => <div className="text-left text-white">Receiver</div>,
        cell: ({ row }) => {
          return (
            <div className="text-sm">
              {shortenAddress(row.getValue('receiver'))}
            </div>
          )
        },
      }),
      columnHelper.accessor((x) => x.blockNumber, {
        id: 'hash',
        header: () => <div className="text-right text-white"></div>,
        cell: ({ row }) => {
          return (
            <div className="flex justify-end text-indigo-500 hover:text-white hover:cursor-pointer">
              <a
                href={`https://sepolia.etherscan.io/tx/${row.getValue('hash')}`}
                target="_blank"
              >
                <ExternalLinkIcon />
              </a>
            </div>
          )
        },
      }),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [transactionsData]
  )

  const table = useReactTable({
    data: transactionsData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div>
      <div className="rounded-md mt-4">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          className="bg-rose-500 hover:bg-rose-500/70"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          className="bg-rose-500 hover:bg-rose-500/70"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
