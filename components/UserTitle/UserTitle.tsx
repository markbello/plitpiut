import { Badge } from '@prisma/client'
import Link from 'next/link'

const UserTitle = ({
  fullName,
  badge,
  userId
}: {
  fullName: string
  badge?: Badge
  userId: string
}) => {
  return (
    <div>
      <Link href={`/users/${userId}`} className="text-display4 block">
        {fullName}
      </Link>
      {badge && (
        <Link
          href={`/badges/${badge.id}`}
          className="text-xs italic text-gray-500"
        >
          {badge.title}
        </Link>
      )}
    </div>
  )
}

export default UserTitle
