import { Container } from '@/components/container'
import Link from 'next/link'

export default function Account() {
  return (
    <main className="flex flex-col items-center justify-between p-24 bg-zinc-900">
      <div className="flex flex-col gap-4 p-40">
        <Link className="hover:text-rose-500/70" href="/">
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
              ></input>
              <input
                className="shadow appearance-none rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-800"
                id="amount"
                type="number"
                placeholder="2 ETH"
              ></input>
            </div>
            <div className="flex flex-col w-1/4 gap-2">
              <button className="bg-rose-500 hover:bg-rose-500/70 text-white font-bold rounded-full w-full h-10">
                SEND
              </button>
              <></>
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
