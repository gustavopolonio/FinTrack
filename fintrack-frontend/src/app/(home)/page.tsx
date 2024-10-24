import { Header } from '@/components/layout/Header'
import { Summary } from '@/components/layout/Summary'
import { TransactionsHistoryContainer } from '@/components/layout/TransactionsHistoryContainer'

export default async function Home() {
  return (
    <>
      <Header />
      <Summary />
      <TransactionsHistoryContainer />
    </>
  )
}
