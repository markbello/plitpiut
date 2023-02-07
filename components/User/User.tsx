import type { UserWithPostsAndBadges } from '../../types/User'
import { Badge, BadgeConnection } from '@prisma/client'
import { FC, PropsWithChildren } from 'react'
import UserAvatar from '../UserAvatar'
import { getFullName } from '../../utils/getFullName'
import UserTitle from '../UserTitle'

export const User: FC<PropsWithChildren<{ user: UserWithPostsAndBadges }>> = ({
  children,
  user
}) => {
  const fullName = getFullName({
    firstName: user.firstName,
    lastName: user.lastName
  })

  const [firstBadge = {} as BadgeConnection & { badge: Badge }] =
    user.badgeConnections ?? []

  return (
    <>
      <UserAvatar
        imageUrl={user.profilePicture.sm}
        userId={user.id}
        fullName={fullName}
      />
      <div className="ml-4">
        <UserTitle
          fullName={fullName}
          badge={firstBadge?.badge}
          userId={user.id}
        />
        {children}
      </div>
    </>
  )
}
