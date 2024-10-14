import { Header } from '@/components/layout/Header'
import { Summary } from '@/components/layout/Summary'
import { TransactionsContainer } from '@/components/layout/TransactionsContainer'

export default async function Home() {
  return (
    <>
      <Header />
      <Summary />
      <TransactionsContainer />
    </>
  )
}
