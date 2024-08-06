import { Container } from '@/components/layout/container'
import ConnectButton from '@/components/form/web3button'
import Link from 'next/link'
import Button from '@/components/form/button'
import { AddressInput, NumberInput } from '@/components/form/input'
import ChainDropDown from '@/components/form/chainDropDown'

export default function Account() {
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
              <AddressInput />
              <NumberInput />
            </div>
            <div className="flex flex-col w-1/4 gap-2">
              <Button text="send" />
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
