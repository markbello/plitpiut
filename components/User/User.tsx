import type { UserWithPostsAndBadges } from '../../types/User'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Badge } from '@prisma/client'

export const User = ({ user }: { user: UserWithPostsAndBadges }) => {
  const pathname = usePathname()
  const fullName = `${user.firstName} ${user.lastName}`

  return (
    <>
      <Image
        src={user.profilePicture.sm}
        className="rounded-full"
        width={64}
        height={64}
        alt={fullName}
      />
      <div className="ml-4">
        <div className="flex items-center text-lg font-semibold">
          {pathname?.includes(`/users/${user.id}`) ? (
            <div>{fullName}</div>
          ) : (
            <Link href={`/users/${user.id}`}>{fullName}</Link>
          )}
        </div>
        {user.badges.length > 0 && (
          <div className="text-xs italic text-gray-500">
            {user.badges[0].badge.title}
          </div>
        )}
      </div>
    </>
  )
}
