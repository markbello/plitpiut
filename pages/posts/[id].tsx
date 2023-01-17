import useSWR from 'swr'
import { useRouter } from 'next/router'
import { Post as PostType } from '../../types/Post'
import { Post } from '../../components/Post'
import { fetcher } from '../../prisma/client'
import Layout from '../../components/Layout'

const PostByIdPage = () => {
  const router = useRouter()
  const { id } = router.query

  const { data: post, error: postsError } = useSWR<PostType>(
    `/api/posts/${id}`,
    fetcher
  )

  const fullName = post
    ? `${post.createdBy.firstName} ${post.createdBy.lastName}`.trim()
    : ''

  const title = post
    ? `Plitpiut - Post by ${fullName}`
    : `Plitpiut - Loading Post`

  return (
    <Layout isLoading={!post} title={title}>
      {post && (
        <div className="p-4">
          <Post post={post} />
        </div>
      )}
    </Layout>
  )
}

export default PostByIdPage
