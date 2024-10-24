import { getTransactions } from '@/lib/api/getTransactions'
import { TransactionsHistory } from './TransactionsHistory'

export async function TransactionsHistoryContainer() {
  const transactions = await getTransactions()

  return (
    <div className="p-4 space-y-4">
      <TransactionsHistory transactions={transactions} />
    </div>
  )
}
