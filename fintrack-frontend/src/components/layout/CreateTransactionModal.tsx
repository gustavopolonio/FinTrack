'use client'

import { useTransactions } from '@/store'

import { FormEvent, useRef, useState } from 'react'

export function CreateTransactionModal() {
  const { getTransactions } = useTransactions()
  const createTransactionModalRef = useRef<HTMLDialogElement>(null)
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [value, setValue] = useState(0)
  const [transactionType, setTransactionType] = useState('income')
  const [isCreatingTransaction, setIsCreatingTransaction] = useState(false)

  function resetCreateTransactionForm() {
    setDescription('')
    setCategory('')
    setValue(0)
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
      value,
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
      getTransactions()
      resetCreateTransactionForm()
      createTransactionModalRef.current?.close()
      setIsCreatingTransaction(false)
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
            stroke-width="2.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
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
                    fill-rule="evenodd"
                    d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                    clip-rule="evenodd"
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

            <input
              type="number"
              placeholder="Value"
              className="input input-bordered w-full"
              value={value === 0 ? '' : value}
              onChange={(e) => setValue(parseFloat(e.target.value))}
              min={0}
              step={0.01}
              required
            />

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
