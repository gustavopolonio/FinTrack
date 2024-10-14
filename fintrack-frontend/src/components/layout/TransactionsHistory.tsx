'use client'

import { useTransactions } from '@/store'
import { formatNumberToCurrencyWithSymbol, formatToLocalDate } from '@/utils'
import { Loader } from '../Loader'

export function TransactionsHistory() {
  const { transactions, isLoading } = useTransactions()

  if (isLoading)
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    )

  return (
    <div className="overflow-x-auto">
      {transactions.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Value</th>
              <th>Category</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction._id}>
                <td>{transaction.description}</td>
                <td>
                  {/* @to-do: change text color to negative balance */}
                  {transaction.type === 'outcome' && '- '}
                  {formatNumberToCurrencyWithSymbol(transaction.value)}
                </td>
                <td>{transaction.category}</td>
                <td>{formatToLocalDate(transaction.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <span className="block text-center">You have no transactions :(</span>
      )}
    </div>
  )
}
