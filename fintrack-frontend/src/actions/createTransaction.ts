'use server'

import { revalidatePath } from 'next/cache'

interface Transaction {
  userId: string
  type: 'income' | 'outcome'
  value: number
  category: string
  description: string
}

export async function createTransaction(transaction: Transaction) {
  await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/transactions`, {
    method: 'POST',
    body: JSON.stringify(transaction),
    headers: {
      'content-type': 'application/json',
    },
  })

  revalidatePath('/')
}
