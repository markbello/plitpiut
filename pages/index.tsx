import Layout from '../components/Layout'
import { PostWithCreatedBy } from '../types/Post'
import { Post } from '../components/Post'
import { PrismaClient } from '@prisma/client'
import { UserWithPostsAndBadges } from '../types/User'

export default function App({ posts }: { posts: PostWithCreatedBy[] }) {
  return (
    <Layout title="All Posts">
      <div className="p-4">
        {posts &&
          posts.map((post) => (
            <Post
              key={post.id}
              post={post}
              createdBy={post.createdBy as UserWithPostsAndBadges}
            />
          ))}
      </div>
    </Layout>
  )
}

const prisma = new PrismaClient()

export const getServerSideProps = async () => {
  await prisma.$connect()

  const posts = await prisma.post.findMany({
    include: {
      createdBy: { include: { badges: { include: { badge: true } } } }
    },
    take: 100
  })

  if (!posts) {
    throw new Error('Posts not found')
  }

  return { props: { posts } }
}
