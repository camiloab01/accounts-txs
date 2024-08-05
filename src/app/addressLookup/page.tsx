import { Container } from '@/components/container'
import Link from 'next/link'

export default function AdressLookup() {
  return (
    <main className="flex flex-col items-center justify-between p-24 bg-zinc-900">
      <div className="flex flex-col gap-4 p-40">
        <Link className="hover:text-rose-500/70" href="/">
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
            ></input>
            <button className="bg-rose-500 hover:bg-rose-500/70 text-white font-bold rounded-full w-full h-10">
              SEARCH
            </button>
          </div>
        </Container>
        <Container>
          <p>Recent account&apos;s transactions:</p>
        </Container>
      </div>
    </main>
  )
}
