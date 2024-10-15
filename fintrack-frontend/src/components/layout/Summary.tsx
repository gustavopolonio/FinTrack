'use client'

import { useEffect } from 'react'

import { useTransactions } from '@/store'
import { formatNumberToCurrencyWithSymbol } from '@/utils'
import { Loader } from '../Loader'

export function Summary() {
  const { transactions, getTransactions, isLoading } = useTransactions()

  useEffect(() => {
    getTransactions()
  }, [getTransactions])

  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'income') {
        acc.incomes += transaction.value
      } else {
        acc.outcomes += transaction.value
      }

      acc.balance = acc.incomes - acc.outcomes
      return acc
    },
    {
      incomes: 0,
      outcomes: 0,
      balance: 0,
    },
  )

  return (
    <div className="p-4 space-y-3">
      <div className="bg-base-content px-4 py-3 rounded-lg space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-base-200">Incomes</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-8 text-success"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>

        <span className="block text-base-200 font-bold text-2xl">
          {isLoading ? (
            <Loader />
          ) : (
            formatNumberToCurrencyWithSymbol(summary.incomes)
          )}
        </span>
      </div>

      <div className="bg-base-content px-4 py-3 rounded-lg space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-base-200">Outcomes</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-8 text-error"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>

        <span className="block text-base-200 font-bold text-2xl">
          {isLoading ? (
            <Loader />
          ) : (
            formatNumberToCurrencyWithSymbol(summary.outcomes)
          )}
        </span>
      </div>

      <div className="bg-primary px-4 py-3 rounded-lg space-y-3">
        {/* @to-do: change bg color to negative balance */}
        <div className="flex items-center justify-between">
          <span className="text-primary-content">Balance</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>

        <span className="block text-primary-content font-bold text-2xl">
          {isLoading ? (
            <Loader />
          ) : (
            formatNumberToCurrencyWithSymbol(summary.balance)
          )}
        </span>
      </div>
    </div>
  )
}
