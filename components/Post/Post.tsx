import { usePathname } from 'next/navigation'
import { format } from 'date-fns'
import Link from 'next/link'
import { UserWithPostsAndBadges } from '../../types/User'
import { User } from '../User'
import { Badge, BadgeConnection, Post as PostType } from '@prisma/client'
import Card from '../Card'
import UserAvatar from '../UserAvatar'
import { getFullName } from '../../utils/getFullName'
import UserTitle from '../UserTitle'

export const Post = ({
  post,
  createdBy
}: {
  post: PostType
  createdBy: UserWithPostsAndBadges
}) => {
  const pathname = usePathname()

  const fullName = getFullName({
    firstName: createdBy.firstName,
    lastName: createdBy.lastName
  })

  const [firstBadgeConnection = {} as BadgeConnection & { badge: Badge }] =
    createdBy.badgeConnections
  const { badge: firstBadge } = firstBadgeConnection

  return (
    <div className="mb-4 flex">
      <div>
        <UserAvatar
          imageUrl={createdBy.profilePicture.sm}
          fullName={fullName}
          userId={createdBy.id}
        />
      </div>
      <Card className="ml-4 px-4 w-full">
        <UserTitle
          fullName={fullName}
          userId={createdBy.id}
          badge={firstBadge}
        />
        <div className="text-sm text-gray-500 mt-2">
          <div>{format(new Date(post.createdAt), 'PPP')}</div>
        </div>
        <div className="my-2">{post.text}</div>
        <div className="text-sm text-gray-700">
          {pathname?.includes(`/posts/${post.id}`) ? (
            <Link href={`/users/${createdBy.id}`}>View Profile</Link>
          ) : (
            <Link href={`/posts/${post.id}`}>View Post</Link>
          )}
        </div>
      </Card>
    </div>
  )
}
