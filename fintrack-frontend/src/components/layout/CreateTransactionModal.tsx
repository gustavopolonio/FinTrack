'use client'

import { useRef, useState } from 'react'

import {
  formatNumberToCurrencyWithoutSymbol,
  removeCommas,
  splitIntegerAndDecimal,
} from '@/utils'
import { createTransaction } from '@/actions/createTransaction'

export function CreateTransactionModal() {
  const createTransactionModalRef = useRef<HTMLDialogElement>(null)
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [value, setValue] = useState('')
  const [transactionType, setTransactionType] = useState<'income' | 'outcome'>(
    'income',
  )

  function resetCreateTransactionForm() {
    setDescription('')
    setCategory('')
    setValue('')
    setTransactionType('income')
  }

  async function handleCreateTransaction() {
    const transactionData = {
      userId: process.env.NEXT_PUBLIC_USER_ID!,
      description,
      type: transactionType,
      category,
      value: Number(removeCommas(value)),
    }

    await createTransaction(transactionData)
    resetCreateTransactionForm()
    createTransactionModalRef.current?.close()
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
        onClose={() => resetCreateTransactionForm()}
      >
        <div className="modal-box space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg">New transaction</h3>
            <form method="dialog">
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

          <form className="space-y-3" action={handleCreateTransaction}>
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
              className={`btn w-full btn-neutral text-white !mt-7`}
            >
              {/* {isPending ? <Loader /> : 'Create'} */}
              Create
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  )
}
