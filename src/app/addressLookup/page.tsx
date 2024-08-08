'use client'

import Button from '@/components/form/button'
import { AddressInput } from '@/components/form/input'
import { Container } from '@/components/layout/container'
import getAccountTransactions from '@/data/getAccountTransactions'
import Link from 'next/link'
import { useState } from 'react'
import { isAddress } from 'viem'

export default function AdressLookup() {
  const [address, setAddress] = useState<string>()

  const searchAddress = async () => {
    if (address) {
      const transactions = await getAccountTransactions(address)
      console.log(transactions)
    }
  }

  return (
    <main className="flex flex-col items-center justify-between p-24 bg-zinc-900">
      <div className="flex flex-col gap-4 p-40">
        <Link className="text-zinc-200 hover:text-rose-500/70" href="/">
          {'<- Go back'}
        </Link>
        <Container>
          <p>Type account address:</p>
          <div className="flex items-center gap-4 mt-4">
            <input
              className="shadow appearance-none rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-800"
              id="address"
              type="text"
              placeholder="0x..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></input>
            <button
              className="bg-rose-500 hover:bg-rose-500/70 disabled:bg-rose-500/70 text-white font-bold rounded-full w-full h-10"
              onClick={searchAddress}
              disabled={!address || !isAddress(address)}
            >
              {'SEARCH'}
            </button>
          </div>
          {address && !isAddress(address) && (
            <p className="text-sm text-red-700">Not a valid Etherum address</p>
          )}
        </Container>
        <Container>
          <p>Recent account&apos;s transactions:</p>
        </Container>
      </div>
    </main>
  )
}
