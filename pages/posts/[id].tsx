import useSWR from 'swr'
import { useRouter } from 'next/router'
import { Post as PostType } from '../../types/Post'
import { Post } from '../../components/Post'
import { fetcher } from '../../prisma/client'
import Layout from '../../components/Layout'

const PostByIdPage = () => {
  const router = useRouter()
  const { id } = router.query

  const { data: post } = useSWR<PostType>(`/api/posts/${id}`, fetcher)

  const fullName = post
    ? `${post.createdBy.firstName} ${post.createdBy.lastName}`.trim()
    : ''

  const title = post
    ? `Plitpiut - Post by ${fullName}`
    : `Plitpiut - Loading Post`

  return (
    post && (
      <Layout isLoading={!post} title={title} description={post.text}>
        {post && (
          <div className="p-4">
            <Post post={post} />
          </div>
        )}
      </Layout>
    )
  )
}

export default PostByIdPage
