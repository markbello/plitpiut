import type { User as UserType } from '../../types/User'
import Image from 'next/image'

export const User = ({ user }: { user: UserType }) => {
  const fullName = `${user.firstName} ${user.lastName}`
  return (
    <div className="m-2 flex rounded-xl border bg-white p-4 shadow-sm">
      <Image
        src={user.profilePicture.sm}
        className="h-12 w-12 rounded-full"
        alt={fullName}
        width={64}
        height={64}
      />
      <div className="ml-4">
        <h2 className="text-lg font-semibold">{fullName}</h2>
      </div>
    </div>
  )
}
