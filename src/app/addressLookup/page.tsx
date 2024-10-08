'use client'

import { Container } from '@/components/layout/container'
import { TransactionsTable } from '@/components/table/transactionsTable'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import getAccountTransactions from '@/data/getAccountTransactions'
import { Transaction } from '@/types/transaction'
import convertToEther from '@/util/convertToEther'
import { Alchemy, AlchemySubscription, Network } from 'alchemy-sdk'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { isAddress } from 'viem'
import { useBalance } from 'wagmi'

export default function AdressLookup() {
  const [address, setAddress] = useState<`0x${string}`>()
  const [accountTransactions, setAccountTransactions] =
    useState<Array<Transaction>>()
  const [newTransaction, setNewTransaction] = useState<Transaction>()
  const usersBalance = useBalance({ address })

  const searchAddress = async () => {
    if (address) {
      const accountTransactionsResponse = await getAccountTransactions(address)
      const transactionsFormatted: Transaction[] =
        accountTransactionsResponse.transfers.map((transfer) => {
          return {
            hash: transfer.hash,
            amount: transfer.value ?? 0,
            assetSymbol: transfer.asset ?? '',
            sender: transfer.from,
            receiver: transfer.to ?? '',
            blockNumber: transfer.blockNum,
          }
        })
      setAccountTransactions(transactionsFormatted)
      // newTransactionsListener()
    }
  }

  useEffect(
    () => {
      if (!address || !isAddress(address)) return
      const config = {
        apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
        network: Network.ETH_SEPOLIA,
      }
      const alchemy = new Alchemy(config)

      alchemy.ws.on(
        {
          method: AlchemySubscription.MINED_TRANSACTIONS,
          addresses: [
            {
              from: address,
            },
          ],
          includeRemoved: true,
        },
        (tx) => {
          const transaction: Transaction = {
            hash: tx.transaction.hash,
            amount: Number(tx.transaction.value) / Math.pow(10, 18),
            sender: tx.transaction.from,
            receiver: tx.transaction.to,
            blockNumber: tx.transaction.blockNumber,
          }
          setNewTransaction(transaction)
        }
      )
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [address]
  )

  useEffect(() => {
    if (!newTransaction) return
    accountTransactions
      ? setAccountTransactions([newTransaction, ...accountTransactions])
      : setAccountTransactions([newTransaction])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newTransaction])

  return (
    <main className="h-full p-10 bg-zinc-900">
      <div className="flex flex-col gap-6">
        <div className="md:w-1/2 sm:my-0 sm:mx-auto">
          <Link className="text-zinc-200 hover:text-rose-500" href="/">
            {'<- Go back'}
          </Link>
          <Container>
            <p>Type account address:</p>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
              <Input
                className="rounded w-full py-2 px-3 text-white text-md"
                id="address"
                type="text"
                placeholder="0x..."
                value={address}
                onChange={(e) => setAddress(e.target.value as `0x${string}`)}
                autoComplete="off"
              />
              <Button
                className="bg-rose-500 hover:bg-rose-500/70 disabled:bg-rose-500/70 text-white font-bold rounded-full w-full md:w-1/4 h-10"
                onClick={searchAddress}
                disabled={!address || !isAddress(address)}
              >
                {'SEARCH'}
              </Button>
            </div>
            {address && !isAddress(address) && (
              <p className="text-sm text-red-700 mt-4">
                Not a valid Etherum address
              </p>
            )}
            {address && isAddress(address) && (
              <p className="text-sm text-white mt-4">
                The account&apos;s balance is{' '}
                {convertToEther(
                  usersBalance.data?.value,
                  usersBalance.data?.decimals
                ).toLocaleString()}{' '}
                ETH
              </p>
            )}
          </Container>
        </div>
        <Container style="md:w-1/2 sm:my-0 sm:mx-auto">
          <p>Recent account&apos;s transactions:</p>
          {accountTransactions && (
            <TransactionsTable transactionsData={accountTransactions} />
          )}
        </Container>
      </div>
    </main>
  )
}
