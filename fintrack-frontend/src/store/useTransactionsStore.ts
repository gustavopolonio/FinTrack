import { create } from 'zustand'

interface Transaction {
  type: 'income' | 'outcome'
  value: number
}

interface TransactionsStore {
  transactions: Transaction[]
  getTransactions: () => Promise<void>
  isLoading: boolean
}

export const useTransactions = create<TransactionsStore>()((set) => ({
  isLoading: false,
  transactions: [],
  // @to-do: receive userId in params of getTransactions function
  getTransactions: async () => {
    set({ isLoading: true })
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${process.env.NEXT_PUBLIC_USER_ID}/transactions`,
    )
    const data = await response.json()
    set({ transactions: data.transactions, isLoading: false })
  },
}))
