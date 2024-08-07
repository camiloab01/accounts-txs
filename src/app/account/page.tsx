'use client'

import { Container } from '@/components/layout/container'
import ConnectButton from '@/components/form/web3button'
import Link from 'next/link'
import ChainDropDown from '@/components/form/chainDropDown'
import { useState } from 'react'
import { isAddress, parseEther } from 'viem'
import {
  useAccount,
  type BaseError,
  useSendTransaction,
  useWaitForTransactionReceipt,
  useBalance,
} from 'wagmi'
import shortenAddress from '@/util/shortenAddress'
import convertToEther from '@/util/convertToEther'

export default function Account() {
  const [toAddress, setToAddress] = useState<string>()
  const [amount, setAmount] = useState<string>()
  const { isConnected, chain, address } = useAccount()
  const { data: hash, error, isPending, sendTransaction } = useSendTransaction()
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })
  const usersBalance = useBalance({ address })

  const executeTx = async () => {
    if (toAddress && amount) {
      sendTransaction({
        to: toAddress as `0x${string}`,
        value: parseEther(amount),
      })
    }
  }

  return (
    <main className="flex flex-col items-center justify-between p-24 bg-zinc-900">
      <div className="flex gap-4 justify-end w-full">
        <ChainDropDown />
        <ConnectButton />
      </div>
      <div className="flex flex-col gap-4 p-40">
        <Link className="text-zinc-200 hover:text-rose-500/70" href="/">
          {'<- Go back'}
        </Link>
        <Container>
          <div className="flex items-center gap-8 mt-4 w-[500px]">
            <div className="flex flex-col w-full gap-2">
              <p>Type account address to send funds:</p>
              <input
                className="shadow appearance-none rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-800"
                id="address"
                type="text"
                placeholder="0x..."
                value={toAddress}
                onChange={(e) => setToAddress(e.target.value)}
              ></input>
              <input
                className="shadow appearance-none rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-800"
                id="amount"
                type="number"
                placeholder="2 ETH"
                min={0}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              ></input>
              <div>
                {toAddress && !isAddress(toAddress) && (
                  <p className="text-sm text-red-700">
                    Not a valid Etherum address
                  </p>
                )}
                {amount &&
                  usersBalance.data?.value &&
                  Number(amount) >
                    convertToEther(
                      usersBalance.data?.value,
                      usersBalance.data?.decimals
                    ) && (
                    <p className="text-sm text-red-700">Insufficient balance</p>
                  )}
              </div>
            </div>
            <div className="flex flex-col w-1/4 gap-2">
              <button
                className="bg-rose-500 hover:bg-rose-500/70 disabled:bg-rose-500/70 text-white font-bold rounded-full w-full h-10"
                onClick={executeTx}
                disabled={
                  !isConnected ||
                  !toAddress ||
                  !amount ||
                  !isAddress(toAddress) ||
                  isPending ||
                  !(Number(amount) > 0) ||
                  (usersBalance.data?.value !== undefined &&
                    Number(amount) >
                      convertToEther(
                        usersBalance.data?.value,
                        usersBalance.data?.decimals
                      ))
                }
              >
                {'SEND'}
              </button>
              {isPending && (
                <p className="text-sm text-green-700">
                  ... executing transaction
                </p>
              )}
              {isConfirmed && (
                <p className="text-sm text-green-700">Transaction confirmed.</p>
              )}
              {hash && !isConfirming && (
                <a
                  href={`${chain?.blockExplorers?.default.url}/tx/${hash}`}
                  target="_blank"
                  className="text-sm hover:text-green-700/70 text-green-700"
                >
                  Transaction hash: {shortenAddress(hash)}
                </a>
              )}
              {isConfirming && (
                <p className="text-sm text-green-700">
                  Waiting for confirmation...
                </p>
              )}
              {error && (
                <p className="text-sm text-red-700">
                  Error: {(error as BaseError).shortMessage || error.message}
                </p>
              )}
            </div>
          </div>
        </Container>
        <Container>
          <p>Popular tokens:</p>
        </Container>
      </div>
    </main>
  )
}
