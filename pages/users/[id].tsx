import { PrismaClient } from '@prisma/client'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import { capitalize } from 'lodash'
import Layout from '../../components/Layout'
import { Post } from '../../components/Post'
import { Post as PostType } from '../../types/Post'
import { User as UserType } from '../../types/User'

const UserByIdPage = ({ user }: { user: UserType & { posts: PostType[] } }) => {
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
          <div className="ml-0 mt-4 md:mt-0 md:ml-16">
            <h1 className="text-4xl font-bold text-center md:text-left">
              {fullName}
            </h1>
            <p className="mt-2 text-xl text-gray-400 text-center md:text-left">
              {`${capitalize(user?.gender)} - Age ${
                new Date().getFullYear() -
                new Date(user?.birthday || '').getFullYear()
              }`}
            </p>
          </div>
        </div>
        <div className="p-4">
          {user.posts.map((post) => (
            <div className="mt-4" key={post.id}>
              <Post post={post} createdBy={user} />
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
    include: { posts: true }
  })

  if (!user) {
    throw new Error('Post not found')
  }

  return { props: { user } }
}

export default UserByIdPage
