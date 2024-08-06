import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Image from 'next/image'
import { cookieToInitialState } from 'wagmi'
import { config } from '@/config/web3Config'
import { headers } from 'next/headers'
import WagmiProviderComp from '@/config/web3Provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const initialState = cookieToInitialState(config, headers().get('cookie'))

  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <WagmiProviderComp initialState={initialState}>
          <div className="flex place-items-center gap-4 bg-red-400 p-10">
            Powered by{' '}
            <Image
              src="/validationCloud.png"
              alt="Validation Cloud Logo"
              width={300}
              height={300}
              priority
            />
          </div>
          {children}
          <div className="flex justify-center bg-black w-full p-5">
            Developed by Camilo Aguero Botero
          </div>
        </WagmiProviderComp>
      </body>
    </html>
  )
}
