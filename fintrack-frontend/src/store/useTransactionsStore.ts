import { create } from 'zustand'

interface Transaction {
  _id: string
  type: 'income' | 'outcome'
  value: number
  category: string
  description: string
  createdAt: string
}

interface TransactionsStore {
  transactions: Transaction[]
  filteredTransactions: Transaction[]
  getTransactions: () => Promise<void>
  filterTransactionsByDescription: (searchValue: string) => void
  isLoading: boolean
}

export const useTransactions = create<TransactionsStore>()((set, get) => ({
  isLoading: true,
  transactions: [],
  filteredTransactions: [],
  // @to-do: receive userId in params of getTransactions function
  getTransactions: async () => {
    set({ isLoading: true })
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${process.env.NEXT_PUBLIC_USER_ID}/transactions`,
    )
    const data = await response.json()
    set({
      transactions: data.transactions,
      filteredTransactions: data.transactions,
      isLoading: false,
    })
  },
  filterTransactionsByDescription: (searchValue: string) => {
    const filteredTransactions = get().transactions.filter((transaction) =>
      transaction.description.toLowerCase().includes(searchValue),
    )
    set({ filteredTransactions })
  },
}))
