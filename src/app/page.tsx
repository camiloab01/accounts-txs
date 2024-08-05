import { Container } from '@/components/container'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24 bg-zinc-900">
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
            <p>Search for accounts, see the transactions, etc.</p>
            <br />
            <p>Go to Address lookup page</p>
          </Container>
          <Container>
            <p>
              See popular tokens, connect your wallet and execute transactions.
            </p>
            <br />
            <p>Go to Account page</p>
          </Container>
        </div>
      </div>
    </main>
  )
}
