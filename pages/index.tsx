import useSWR from 'swr'
import Layout from '../components/Layout'
import { Post as PostType } from '../types/Post'
import { Post } from '../components/Post'

// @ts-ignore
const fetcher = (url) => fetch(url).then((res) => res.json())

// Learn more about using SWR to fetch data from
// your API routes -> https://swr.vercel.app/
// This is a placeholder ID, you could swap out with real data
export default function App() {
  const { data: posts = [] as PostType[], error: postsError } = useSWR<
    PostType[]
  >('/api/posts', fetcher)

  if (postsError)
    return (
      <>
        <span>An error has occurred.</span>

        <button>click me</button>
      </>
    )
  if (!posts) return 'Loading...'
  return (
    <Layout>
      <div className="p-4">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </Layout>
  )
}
