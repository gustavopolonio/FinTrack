import { SearchTransactionsForm } from './SearchTransactionsForm'
import { TransactionsHistory } from './TransactionsHistory'

export function TransactionsContainer() {
  return (
    <div className="p-4 space-y-3">
      <SearchTransactionsForm />
      <TransactionsHistory />
    </div>
  )
}
