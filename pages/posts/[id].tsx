import { PrismaClient } from '@prisma/client'
import { PostWithCreatedBy } from '../../types/Post'
import { Post } from '../../components/Post'
import Layout from '../../components/Layout'
import { GetServerSideProps } from 'next'
import { UserWithPostsAndBadges } from '../../types/User'

const PostByIdPage = ({ post }: { post: PostWithCreatedBy }) => {
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
          <Post
            post={post}
            createdBy={post.createdBy as UserWithPostsAndBadges}
          />
        </div>
      )}
    </Layout>
  )
}

const prisma = new PrismaClient()

export const getServerSideProps: GetServerSideProps<{
  post: PostWithCreatedBy
}> = async ({ query }) => {
  await prisma.$connect()

  const id = query.id as string

  const post = await prisma.post.findFirst({
    where: { id },
    include: { createdBy: { include: { badgeConnections: true, posts: true } } }
  })

  if (!post) {
    throw new Error('Post not found')
  }

  return { props: { post } }
}

export default PostByIdPage
