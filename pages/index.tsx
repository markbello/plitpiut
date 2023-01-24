import Layout from '../components/Layout'
import { PostWithCreatedBy } from '../types/Post'
import { Post } from '../components/Post'
import { PrismaClient } from '@prisma/client'
import { UserWithPostsAndBadges } from '../types/User'
import { stringify } from 'superjson'
import { parse } from '../utils/parse'

export default function App({ posts }: { posts: PostWithCreatedBy[] }) {
  const parsedPosts = parse(posts)
  return (
    <Layout title="All Posts">
      <div className="p-4">
        {posts &&
          parsedPosts.map((post) => (
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
      createdBy: { include: { badgeConnections: { include: { badge: true } } } }
    },
    where: { createdBy: { bio: { contains: 'Qanon' } } },
    take: 100
  })

  if (!posts) {
    throw new Error('Posts not found')
  }

  return { props: { posts: stringify(posts) } }
}
