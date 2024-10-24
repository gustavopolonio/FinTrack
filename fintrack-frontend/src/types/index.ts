export interface Transaction {
  _id: string
  type: 'income' | 'outcome'
  value: number
  category: string
  description: string
  createdAt: string
}
