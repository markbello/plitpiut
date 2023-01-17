import useSWR from 'swr'
import Layout from '../components/Layout'
import { Post as PostType } from '../types/Post'
import { Post } from '../components/Post'
import { fetcher } from '../prisma/client'

export default function App() {
  const { data: posts, error: postsError } = useSWR<PostType[]>(
    '/api/posts',
    fetcher
  )

  if (postsError)
    return (
      <>
        <span>An error has occurred.</span>

        <button>click me</button>
      </>
    )

  return (
    <Layout isLoading={!posts}>
      <div className="p-4">
        {posts && posts.map((post) => <Post key={post.id} post={post} />)}
      </div>
    </Layout>
  )
}
