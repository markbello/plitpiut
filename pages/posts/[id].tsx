import { PrismaClient } from '@prisma/client'
import { Post as PostType } from '../../types/Post'
import { Post } from '../../components/Post'
import Layout from '../../components/Layout'
import { GetServerSideProps } from 'next'

const PostByIdPage = ({ post }: { post: PostType }) => {
  const fullName = post
    ? `${post.createdBy.firstName} ${post.createdBy.lastName}`.trim()
    : ''

  return (
    <Layout
      title={`Post by ${fullName}: ${post.text}`}
      description={post?.text}
      ogImage={post.createdBy.profilePicture.xl}
    >
      {post && (
        <div className="p-4">
          <Post post={post} createdBy={post.createdBy} />
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
