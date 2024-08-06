import Button from '@/components/form/button'
import { AddressInput } from '@/components/form/input'
import { Container } from '@/components/layout/container'
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
            <AddressInput />
            <Button text="search" />
          </div>
        </Container>
        <Container>
          <p>Recent account&apos;s transactions:</p>
        </Container>
      </div>
    </main>
  )
}
