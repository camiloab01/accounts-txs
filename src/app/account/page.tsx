'use client'

import { Container } from '@/components/layout/container'
import ConnectButton from '@/components/form/web3button'
import Link from 'next/link'
import ChainDropDown from '@/components/form/chainDropDown'
import { useEffect, useState } from 'react'
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
import getTokens from '@/data/getTokens'
import { TokenAddress } from '@/types/tokenAddress'
import { Token } from '@/types/token'
import { ExternalLinkIcon } from '@radix-ui/react-icons'
import { TokensTable } from '@/components/table/tokensTable'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Account() {
  const [toAddress, setToAddress] = useState<string>()
  const [amount, setAmount] = useState<string>()
  const [tokensList, setTokensList] = useState<Array<Token>>()
  const { isConnected, chain, address } = useAccount()
  const { data: hash, error, isPending, sendTransaction } = useSendTransaction()
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })
  const usersBalance = useBalance({ address })
  const tokensContractList: Array<TokenAddress> = [
    { tokenAddress: '0xae7ab96520de3a18e5e111b5eaab095312d7fe84' },
    { tokenAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7' },
    { tokenAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' },
    { tokenAddress: '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0' },
    { tokenAddress: '0x514910771af9ca656af840dff83e8264ecf986ca' },
  ]

  useEffect(() => {
    const fetchTokens = async () => {
      const response = await getTokens('0x1', tokensContractList)
      if (response?.toJSON()) {
        const tokensFormatted: Token[] = response?.toJSON().map((token) => {
          return {
            tokenLogo: token.tokenLogo ?? '',
            tokenName: token.tokenSymbol ?? '',
            tokenSymbol: token.tokenSymbol ?? '',
            priceUSD: token.usdPrice,
            tokenAddress: token.tokenAddress ?? '',
          }
        })
        setTokensList(tokensFormatted)
      }
    }
    fetchTokens()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const executeTx = async () => {
    if (toAddress && amount) {
      sendTransaction({
        to: toAddress as `0x${string}`,
        value: parseEther(amount),
      })
    }
  }

  return (
    <main className="h-full p-10 bg-zinc-900">
      <div className="flex flex-col gap-6">
        <div className="flex gap-4 justify-end w-full md:px-14">
          <ChainDropDown />
          <ConnectButton />
        </div>
        <div className="md:w-1/2 sm:my-0 sm:mx-auto">
          <Link className="text-zinc-200 hover:text-rose-500" href="/">
            {'<- Go back'}
          </Link>
          <Container>
            <div className="flex flex-col gap-2">
              <p>Type account address to send funds:</p>
              <div className="flex flex-col sm:flex-row">
                <div className="flex flex-col sm:w-1/2 gap-4">
                  <Input
                    className="rounded w-full py-2 px-3 text-white text-md"
                    id="address"
                    type="text"
                    placeholder="0x..."
                    value={toAddress}
                    onChange={(e) => setToAddress(e.target.value)}
                    autoComplete="off"
                  />
                  <Input
                    className="rounded w-full py-2 px-3 text-white text-md"
                    id="amount"
                    type="number"
                    placeholder="2 ETH"
                    min={0}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    autoComplete="off"
                  />
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
                        <p className="text-sm text-red-700">
                          Insufficient balance
                        </p>
                      )}
                  </div>
                </div>
                <div className="flex flex-col sm:w-1/2 gap-4">
                  <Button
                    className="bg-rose-500 hover:bg-rose-500/70 disabled:bg-rose-500/70 text-white font-bold rounded-full h-10 w-1/2 m-auto"
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
                  </Button>
                  {isPending && (
                    <p className="text-sm text-green-700 text-center">
                      executing transaction...
                    </p>
                  )}
                  {isConfirmed && (
                    <p className="text-sm text-green-700 text-center">
                      Transaction confirmed.
                    </p>
                  )}
                  {hash && !isConfirming && (
                    <a
                      href={`${chain?.blockExplorers?.default.url}/tx/${hash}`}
                      target="_blank"
                      className="flex justify-center items-center text-sm hover:text-rose-700 text-green-700 gap-1"
                    >
                      Transaction hash: {shortenAddress(hash)}
                      <ExternalLinkIcon />
                    </a>
                  )}
                  {isConfirming && (
                    <p className="text-sm text-green-700 text-center">
                      Waiting for confirmation...
                    </p>
                  )}
                  {error && (
                    <p className="text-sm text-red-700 text-center">
                      Error:{' '}
                      {(error as BaseError).shortMessage || error.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Container>
        </div>
        <Container style="md:w-1/2 sm:my-0 sm:mx-auto">
          <p>Popular tokens:</p>
          <TokensTable tokensData={tokensList ? tokensList : []} />
        </Container>
      </div>
    </main>
  )
}
