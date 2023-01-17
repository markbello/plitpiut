import useSWR from 'swr'
import Layout from '../components/Layout'
import User from '../components/User'
import { User as UserType } from '../types/User'

// @ts-ignore
const fetcher = (url) => fetch(url).then((res) => res.json())

// Learn more about using SWR to fetch data from
// your API routes -> https://swr.vercel.app/
// This is a placeholder ID, you could swap out with real data
export default function App() {
  const { data: users = [] as UserType[], error } = useSWR<UserType[]>(
    '/api/item',
    fetcher
  )

  console.log(users)

  if (error)
    return (
      <>
        <span>An error has occurred.</span>

        <button>click me</button>
      </>
    )
  if (!users) return 'Loading...'
  return (
    <Layout>
      <div className="grid grid-cols-4">
        {users.map((user) => (
          <User key={user.id} user={user} />
        ))}
      </div>
    </Layout>
  )
}
