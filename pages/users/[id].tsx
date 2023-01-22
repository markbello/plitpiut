import { PrismaClient } from '@prisma/client'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import { capitalize } from 'lodash'
import Layout from '../../components/Layout'
import { Post } from '../../components/Post'
import { UserWithPostsAndBadges } from '../../types/User'
import { getCloudfrontUrl } from '../../utils/getCloudfrontUrl'
import { PostWithCreatedBy } from '../../types/Post'

const UserByIdPage = ({ user }: { user: UserWithPostsAndBadges }) => {
  const fullName = `${user.firstName} ${user.lastName}`.trim()

  return (
    <Layout title={`${fullName}'s Profile`} ogImage={user.profilePicture.xl}>
      <div>
        <div className="bg-white py-8 flex flex-col md:flex-row shadow-sm px-0 md:px-8">
          <Image
            height={256}
            width={256}
            src={user.profilePicture.xl}
            className="max-w-1/4 rounded-full self-center"
            alt={fullName}
          />
          <div className="ml-0 mt-4 md:mt-0 md:ml-16 ">
            <div className="flex items-center justify-center">
              <h1 className="text-4xl font-bold text-center md:text-left">
                {fullName}
              </h1>
              {user.badges.length > 0 && (
                <div className="ml-2">
                  {user.badges.map(({ badge }) => (
                    <div className="mt-2 mr-2 last:mr-0" key={badge.id}>
                      <Image
                        alt={badge.title}
                        src={getCloudfrontUrl() + `/badges/${badge.imageName}`}
                        height={40}
                        width={40}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="text-xl text-gray-400 text-center md:text-left">
              {`${capitalize(user?.gender)} - Age ${
                new Date().getFullYear() -
                new Date(user?.birthday || '').getFullYear()
              }`}
            </div>
            <div className="mt-2 text-center md:text-left">{user?.bio}</div>
          </div>
        </div>
        <div className="p-4">
          {user.posts.map((post) => (
            <div className="mt-4" key={post.id}>
              <Post post={post as PostWithCreatedBy} createdBy={user} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

const prisma = new PrismaClient()

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  await prisma.$connect()

  const id = query.id as string

  const user = await prisma.user.findFirst({
    where: { id },
    include: { posts: true, badges: { include: { badge: true } } }
  })

  if (!user) {
    throw new Error('Post not found')
  }

  return { props: { user } }
}

export default UserByIdPage
