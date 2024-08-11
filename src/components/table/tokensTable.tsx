'use client'

import { Token } from '@/types/token'
import shortenAddress from '@/util/shortenAddress'
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { ExternalLinkIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import { useMemo } from 'react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export const TokensTable = ({ tokensData }: { tokensData: Token[] }) => {
  const columnHelper = createColumnHelper<Token>()

  const columns = useMemo(
    () => [
      columnHelper.accessor((x) => x.tokenLogo, {
        id: 'tokenLogo',
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
      }),
      columnHelper.accessor((x) => x.tokenName, {
        id: 'tokenName',
        header: () => <div className="text-left text-white">Name</div>,
        cell: ({ row }) => {
          return <div className="text-sm flex">{row.getValue('tokenName')}</div>
        },
      }),
      columnHelper.accessor((x) => x.tokenSymbol, {
        id: 'tokenSymbol',
        header: () => <div className="text-left text-white">Symbol</div>,
        cell: ({ row }) => {
          return (
            <div className="text-sm flex">{row.getValue('tokenSymbol')}</div>
          )
        },
      }),
      columnHelper.accessor((x) => x.tokenAddress, {
        id: 'tokenAddress',
        header: () => <div className="text-left text-white">Token Address</div>,
        cell: ({ row }) => {
          return (
            <div className="text-sm flex">
              {shortenAddress(row.getValue('tokenAddress'))}
            </div>
          )
        },
      }),
      columnHelper.accessor((x) => x.priceUSD, {
        id: 'priceUSD',
        header: () => <div className="text-right text-white">Price (USD)</div>,
        cell: ({ row }) => {
          return (
            <div className="text-right text-sm">
              ${(row.getValue('priceUSD') as Number).toLocaleString()}
            </div>
          )
        },
      }),
      columnHelper.accessor((x) => x.tokenAddress, {
        id: 'tokenLink',
        header: () => <div></div>,
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
      }),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tokensData]
  )

  const table = useReactTable({
    data: tokensData,
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
