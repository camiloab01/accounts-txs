import { Container } from '@/components/layout/container'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="h-full p-10 bg-zinc-900">
      <div className="flex flex-col gap-4">
        <Container style="md:w-1/2 sm:my-0 sm:mx-auto">
          <p>
            With this application you can search for addresses, see their
            balance, execute transactions, see information about tokens, and
            more. 📈
            <br />
            <br />
            It was built using NextJS 14, Typescript and Tailwind. It uses
            Moralis and Alchemy SDKs to fetch data on chain. And uses Wagmi,
            WalletConnect, and Viem to connect to the blockchain. ☕️
            <br />
            <br />
            Use the options below to navigate to the AddressLookup page and the
            Account page. 🏄🏻‍♂️
          </p>
        </Container>
        <div className="flex flex-col sm:flex-row lg:w-1/2 md:w-1/2 gap-4 mx-auto">
          <Container>
            <p className="mb-8">
              Search for accounts and see their transactions.
              <br />
              <br />
              👇🏻
            </p>
            <Link className="hover:text-rose-500" href="/addressLookup">
              {'-> Go to Address lookup'}
            </Link>
          </Container>
          <Container>
            <p className="mb-8">
              Connect your wallet, execute transactions. And see live price
              information about tokens.
              <br />
              <br />
              👇🏻
            </p>
            <Link className="hover:text-rose-500" href="/account">
              {'-> Go to Account'}
            </Link>
          </Container>
        </div>
      </div>
    </main>
  )
}
