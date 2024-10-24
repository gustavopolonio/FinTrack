import { Transaction } from '@/types'

export async function getTransactions(): Promise<Transaction[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${process.env.NEXT_PUBLIC_USER_ID}/transactions`,
  )
  const data = await response.json()
  return data.transactions
}
