'use client'

import { useEffect, useState } from 'react'

import { formatNumberToCurrencyWithSymbol, formatToLocalDate } from '@/utils'
import { Transaction } from '@/types'

interface TransactionsHistoryProps {
  transactions: Transaction[]
}

const initialTransactionsQty = 10
const transactionsQtyStep = 10

export function TransactionsHistory({
  transactions,
}: TransactionsHistoryProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [transactionsQty, setTransactionsQty] = useState(initialTransactionsQty)

  const filteredTransactions =
    transactions?.filter((transaction) =>
      transaction.description.toLowerCase().includes(searchTerm),
    ) || []

  const filteredTransactionsPaginated = [...filteredTransactions].slice(
    0,
    transactionsQty,
  )

  const hasMoreTransactions =
    filteredTransactions.length > filteredTransactionsPaginated.length

  function loadMoreTransactions() {
    setTransactionsQty((currentQty) => currentQty + transactionsQtyStep)
  }

  useEffect(() => {
    setTransactionsQty(initialTransactionsQty)
  }, [searchTerm])

  return (
    <>
      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>

        <input
          type="text"
          className="grow"
          placeholder="Search for description"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </label>

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
              <button className="btn btn-block" onClick={loadMoreTransactions}>
                Load more ...
              </button>
            )}
          </>
        ) : (
          <span className="block text-center">You have no transactions :(</span>
        )}
      </div>
    </>
  )
}
