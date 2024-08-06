import { Container } from '@/components/layout/container'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex items-center justify-between p-24 bg-zinc-900">
      <div className="flex flex-col gap-4 p-40">
        <Container>
          <p>
            This applications uses Validation Cloud Node API and Wagmi to fetch
            accounts and execute transactions.
            <br />
            <br />
            It was build on NextJS, Typescript and Tailwind. Use the main menu
            to navigate between the Address Lookup page and the Account page.
          </p>
        </Container>
        <div className="flex gap-4">
          <Container>
            <p className="mb-8">Search for accounts, see the transactions.</p>
            <Link className="hover:text-rose-500/70" href="/addressLookup">
              {'-> Go to Address lookup'}
            </Link>
          </Container>
          <Container>
            <p className="mb-8">
              See popular tokens, connect your wallet and execute transactions.
            </p>
            <Link className="hover:text-rose-500/70" href="/account">
              {'-> Go to Account'}
            </Link>
          </Container>
        </div>
      </div>
    </main>
  )
}
