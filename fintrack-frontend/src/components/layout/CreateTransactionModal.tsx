'use client'

import { useTransactions } from '@/store'
import {
  formatNumberToCurrencyWithoutSymbol,
  removeCommas,
  splitIntegerAndDecimal,
} from '@/utils'

import { FormEvent, useRef, useState } from 'react'

export function CreateTransactionModal() {
  const { getTransactions } = useTransactions()
  const createTransactionModalRef = useRef<HTMLDialogElement>(null)
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [value, setValue] = useState('')
  const [transactionType, setTransactionType] = useState('income')
  const [isCreatingTransaction, setIsCreatingTransaction] = useState(false)

  function resetCreateTransactionForm() {
    setDescription('')
    setCategory('')
    setValue('')
    setTransactionType('income')
  }

  async function handleCreateTransaction(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsCreatingTransaction(true)

    const transactionData = {
      userId: process.env.NEXT_PUBLIC_USER_ID,
      description,
      type: transactionType,
      category,
      value: Number(removeCommas(value)),
    }

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/transactions`, {
        method: 'POST',
        body: JSON.stringify(transactionData),
        headers: {
          'content-type': 'application/json',
        },
      })
    } catch (err) {
      console.log(err)
    } finally {
      // @to-do: don't get transactions if error
      getTransactions()
      resetCreateTransactionForm()
      createTransactionModalRef.current?.close()
      setIsCreatingTransaction(false)
    }
  }

  const handleFormatValueToCurrency = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    let transactionValueInput = removeCommas(e.target.value)

    if (transactionValueInput === '') {
      setValue('')
      return
    }

    // Check if it's a valid number
    if (!isNaN(Number(transactionValueInput))) {
      let { integerPart, decimalPart } = splitIntegerAndDecimal(
        transactionValueInput,
      )

      integerPart = formatNumberToCurrencyWithoutSymbol(Number(integerPart))

      if (typeof decimalPart !== 'undefined') {
        decimalPart = decimalPart.slice(0, 2)
        transactionValueInput = `${integerPart}.${decimalPart}`
      } else {
        transactionValueInput = integerPart
      }

      setValue(transactionValueInput)
    }
  }

  return (
    <>
      <button
        className="btn btn-neutral btn-circle btn-sm w-10 h-10"
        onClick={() => createTransactionModalRef.current?.showModal()}
      >
        <div className="indicator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </div>
      </button>

      <dialog
        ref={createTransactionModalRef}
        className="modal modal-bottom sm:modal-middle"
        onCancel={() => resetCreateTransactionForm()}
      >
        <div className="modal-box space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg">New transaction</h3>
            <form method="dialog" onSubmit={() => resetCreateTransactionForm()}>
              <button className="btn btn-circle btn-sm w-10 h-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </form>
          </div>

          <form className="space-y-3" onSubmit={handleCreateTransaction}>
            <input
              type="text"
              name="description"
              placeholder="Description"
              className="input input-bordered w-full"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              minLength={3}
              required
            />

            <label className="input input-bordered flex items-center gap-2">
              $
              <input
                type="text"
                placeholder="Value"
                className="grow"
                value={value}
                onChange={handleFormatValueToCurrency}
                required
              />
            </label>

            <input
              type="text"
              placeholder="Category"
              className="input input-bordered w-full"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />

            <div className="flex gap-3">
              <button
                type="button"
                className={`btn flex-1 ${transactionType === 'income' ? ' btn-success text-white' : ''}`}
                onClick={() => setTransactionType('income')}
              >
                Income
              </button>
              <button
                type="button"
                className={`btn flex-1 ${transactionType === 'outcome' ? ' btn-error text-white' : ''}`}
                onClick={() => setTransactionType('outcome')}
              >
                Outcome
              </button>
            </div>

            <button
              type="submit"
              className={`btn w-full btn-neutral text-white !mt-7 ${isCreatingTransaction ? 'btn-disabled' : ''}`}
            >
              {isCreatingTransaction ? (
                <span className="loading loading-spinner"></span>
              ) : (
                'Create'
              )}
            </button>
          </form>
        </div>
        <form
          method="dialog"
          className="modal-backdrop"
          onSubmit={() => resetCreateTransactionForm()}
        >
          <button>close</button>
        </form>
      </dialog>
    </>
  )
}
