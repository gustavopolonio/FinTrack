import { SearchTransactionsForm } from './SearchTransactionsForm'
import { TransactionsHistory } from './TransactionsHistory'

export function TransactionsContainer() {
  return (
    <div className="p-4 space-y-4">
      <SearchTransactionsForm />
      <TransactionsHistory />
    </div>
  )
}
