import type { Metadata } from 'next'
import { Inconsolata } from 'next/font/google'
import './globals.css'
import Image from 'next/image'
import { cookieToInitialState } from 'wagmi'
import { config } from '@/config/web3Config'
import { headers } from 'next/headers'
import WagmiProviderComp from '@/config/web3Provider'
import { LinkedInLogoIcon, GitHubLogoIcon } from '@radix-ui/react-icons'

const inter = Inconsolata({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Validation Cloud Challenge',
  description: 'Developed by Camilo Aguero Botero',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const initialState = cookieToInitialState(config, headers().get('cookie'))

  return (
    <html lang="en">
      <body className={`${inter.className} bg-zinc-900`}>
        <WagmiProviderComp initialState={initialState}>
          <div className="h-screen justify-around flex flex-col gap-10">
            <div className="flex flex-col place-items-center gap-2 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 p-5">
              <Image
                src="/validationCloud.png"
                alt="Validation Cloud Logo"
                width={300}
                height={300}
                priority
              />
              <p className="text-white text-xl font-semibold">CHALLENGE 🎯</p>
            </div>
            {children}
            <footer className="sm:flex justify-self-end text-zinc-200 justify-center align-center bg-black w-full p-5 gap-2 hidden">
              <p>Developed by Camilo Aguero Botero</p>
              <a
                href="https://www.linkedin.com/in/camilo-aguero-botero/"
                target="_blank"
              >
                <LinkedInLogoIcon
                  className="text-rose-500 hover:text-indigo-500 align-center cursor-pointer"
                  width={25}
                  height={25}
                />
              </a>
              <a href="https://github.com/camiloab01" target="_blank">
                <GitHubLogoIcon
                  className="text-rose-500 hover:text-indigo-500 align-center cursor-pointer"
                  width={25}
                  height={25}
                />
              </a>
            </footer>
          </div>
        </WagmiProviderComp>
      </body>
    </html>
  )
}
