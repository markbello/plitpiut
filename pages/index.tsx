import useSWR from 'swr'
import Layout from '../components/Layout'

// @ts-ignore
const fetcher = (url) => fetch(url).then((res) => res.json())

// Learn more about using SWR to fetch data from
// your API routes -> https://swr.vercel.app/
// This is a placeholder ID, you could swap out with real data
export default function App() {
  const { data, error } = useSWR(
    '/api/item?id=aee1700b-68d5-4afa-8e53-a52a56efeb73',
    fetcher
  )

  if (error)
    return (
      <>
        <span>An error has occurred.</span>

        <button>click me</button>
      </>
    )
  if (!data) return 'Loading...'
  return <Layout>{JSON.stringify(data, null, 2)}</Layout>
}
