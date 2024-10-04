import { Header } from '@/components/Header'

export default async function Home() {
  // const data = await fetch(
  //   `${process.env.API_BASE_URL}/users/${process.env.USER_ID}/transactions`,
  // )
  // const response = await data.json()
  // console.log(response.transactions)

  return (
    <>
      <Header />
    </>
  )
}
