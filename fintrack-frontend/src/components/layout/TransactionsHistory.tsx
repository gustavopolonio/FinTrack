'use client'

import { useState } from 'react'

import { useTransactions } from '@/store'
import { formatNumberToCurrencyWithSymbol, formatToLocalDate } from '@/utils'
import { Loader } from '../Loader'

export function TransactionsHistory() {
  const { isLoading, filteredTransactions } = useTransactions()
  const [transactionsToShow, setTransactionsToShow] = useState(10)

  const filteredTransactionsPaginated = [...filteredTransactions].slice(
    0,
    transactionsToShow,
  )
  const hasMoreTransactions =
    filteredTransactions > filteredTransactionsPaginated

  function showMoreTransactions() {
    setTransactionsToShow((current) => current + 10)
  }

  if (isLoading)
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    )

  return (
    <div className="overflow-x-auto space-y-4">
      {filteredTransactions.length > 0 ? (
        <>
          <span className="block text-center text-sm">
            Showing {filteredTransactionsPaginated.length} of{' '}
            {filteredTransactions.length} transactions
          </span>

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
              {filteredTransactionsPaginated.map((transaction) => (
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

          {hasMoreTransactions && (
            <button className="btn btn-block" onClick={showMoreTransactions}>
              Load more ...
            </button>
          )}
        </>
      ) : (
        <span className="block text-center">You have no transactions :(</span>
      )}
    </div>
  )
}
