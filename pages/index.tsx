import Layout from '../components/Layout'
import { PostWithCreatedBy } from '../types/Post'
import { Post } from '../components/Post'
import { PrismaClient } from '@prisma/client'
import { UserWithPostsAndBadges } from '../types/User'
import { stringify } from 'superjson'
import { parse } from '../utils/parse'
import Card from '../components/Card'
import { ChatIcon } from '../components/Icons/ChatIcon'
import UserTitle from '../components/UserTitle'
import { getFullName } from '../utils/getFullName'
import { BadgeConnectionWithBadge } from '../types/Badge'
import StatusLight from '../components/StatusLight'
import UserAvatar from '../components/UserAvatar'
import { useState } from 'react'
import Modal from '../components/Modal'
import ChatWindow from '../components/ChatWindow'
import { useUser } from '@auth0/nextjs-auth0/client'
import { useUserFromDb } from '../queries/useUserFromDb'

export default function App({
  plit,
  posts
}: {
  plit: UserWithPostsAndBadges
  posts: PostWithCreatedBy[]
}) {
  const parsedPlit = parse(plit)
  const parsedPosts = parse(posts)

  const fullName = getFullName({
    firstName: parsedPlit.firstName,
    lastName: parsedPlit.lastName
  })

  const { user } = useUser()

  const { badgeConnections = [] as BadgeConnectionWithBadge[] } = parsedPlit
  const [firstBadgeConnection = {} as BadgeConnectionWithBadge] =
    badgeConnections
  const { badge: firstBadge } = firstBadgeConnection

  const [shouldShowModal, setShouldShowModal] = useState(false)

  return (
    <Layout title="All Posts">
      <div>
        <Card className="mb-4 rounded-t-none rounded-b-none shadow-none px-8">
          <h2 className="text-display3">Adopt a Plit</h2>
          <p className="mt-2">
            The Plits are lonely! They need your care and support. Chat one up
            today to hear their complaints or backstory.
          </p>
          <div className="my-4 flex">
            <UserAvatar
              fullName={fullName}
              userId={parsedPlit.id}
              imageUrl={parsedPlit.profilePicture.sm}
            />
            <div>
              <div className="flex ml-2">
                <UserTitle
                  fullName={fullName}
                  userId={parsedPlit.id}
                  badge={firstBadge}
                />
                <div className="ml-1 pt-1">
                  <StatusLight />
                </div>
              </div>
              {user ? (
                <>
                  <button
                    className="m-2 flex items-center"
                    onClick={() => setShouldShowModal(true)}
                  >
                    <ChatIcon />
                    <span className="ml-2">Chat</span>
                  </button>
                  <Modal
                    onRequestClose={() => setShouldShowModal(false)}
                    isOpen={shouldShowModal}
                    title="Chat with Grant Considine"
                  >
                    <ChatWindow plit={parsedPlit} humanUserSub={user.sub!} />
                  </Modal>
                </>
              ) : (
                <span className="ml-4 text-sm text-gray-500">
                  Log In to Chat
                </span>
              )}
            </div>
          </div>
        </Card>
        <div className="p-4 lg:px-8">
          {posts &&
            parsedPosts.map((post) => (
              <Post
                key={post.id}
                post={post}
                createdBy={post.createdBy as UserWithPostsAndBadges}
              />
            ))}
        </div>
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

  const plit = await prisma.user.findFirst({
    include: { badgeConnections: { include: { badge: true } }, posts: true },
    where: { lastName: 'Considine' }
  })

  return { props: { posts: stringify(posts), plit: stringify(plit) } }
}
