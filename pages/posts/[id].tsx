import useSWR from 'swr'
import { useRouter } from 'next/router'
import { PrismaClient } from '@prisma/client'
import { Post as PostType } from '../../types/Post'
import { Post } from '../../components/Post'
import { fetcher } from '../../prisma/client'
import Layout from '../../components/Layout'
import { GetServerSideProps } from 'next'

const PostByIdPage = ({ post }: { post: PostType }) => {
  const fullName = post
    ? `${post.createdBy.firstName} ${post.createdBy.lastName}`.trim()
    : ''

  const title = post ? `Post by ${fullName}: ${post.text}` : undefined

  return (
    <Layout
      isLoading={!post}
      title={title}
      description={post?.text}
      ogImage={post.createdBy.profilePicture.xl}
    >
      {post && (
        <div className="p-4">
          <Post post={post} />
        </div>
      )}
    </Layout>
  )
}

const prisma = new PrismaClient()

export const getServerSideProps: GetServerSideProps<{
  post: PostType
}> = async ({ query }) => {
  await prisma.$connect()

  const id = query.id as string

  const post = (await prisma.post.findFirst({
    where: { id },
    include: { createdBy: true }
  })) as unknown as PostType

  if (!post) {
    throw new Error('Post not found')
  }

  return { props: { post } }
}

export default PostByIdPage
