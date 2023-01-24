import { PrismaClient } from '@prisma/client'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import Layout from '../../components/Layout'
import { User } from '../../components/User'
import { BadgeWithUsersAndPosts } from '../../types/Badge'
import { UserWithPostsAndBadges } from '../../types/User'
import { getCloudfrontUrl } from '../../utils/getCloudfrontUrl'

const BadgeByIdPage = ({ badge }: { badge: BadgeWithUsersAndPosts }) => {
  return (
    <Layout title={`${badge.title} Badge Page`} ogImage={badge.imageName}>
      <div>
        <div className="bg-white py-8 flex flex-col md:flex-row shadow-sm px-0 md:px-8">
          <Image
            height={256}
            width={256}
            src={getCloudfrontUrl() + `/badges/${badge.imageName}`}
            className="max-w-1/4 rounded-full self-center"
            alt={badge.title}
          />
          <div className="ml-0 mt-4 md:mt-0 md:ml-16 ">
            <div className="flex items-center">
              <h1 className="text-4xl font-bold text-center md:text-left">
                {badge.title}
              </h1>
            </div>

            <div className="mt-2 text-center md:text-left">
              {badge.description}
            </div>
          </div>
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {badge.badgeConnections.map(({ user }) => (
            <div
              className="p-4 bg-white shadow-sm rounded-xl flex"
              key={user.id}
            >
              <User user={user as UserWithPostsAndBadges} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

const prisma = new PrismaClient()

export const getServerSideProps: GetServerSideProps<{
  badge: BadgeWithUsersAndPosts
}> = async ({ query }) => {
  await prisma.$connect()

  const id = query.id as string

  const badge = await prisma.badge.findFirst({
    where: { id },
    include: {
      badgeConnections: {
        include: {
          user: {
            include: {
              badgeConnections: { include: { badge: true } },
              posts: { include: { createdBy: true } }
            }
          }
        }
      }
    }
  })

  if (!badge) {
    throw new Error('Post not found')
  }

  return { props: { badge } }
}

export default BadgeByIdPage
