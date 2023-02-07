import { User } from '@prisma/client'
import Image from 'next/image'
import { getFullName } from '../../../utils/getFullName'
import Spinner from '../../Spinner'
import UserAvatar from '../../UserAvatar'

const Message = ({ user, text }: { user: User; text: string }) => {
  const fullName = getFullName({
    firstName: user.firstName,
    lastName: user.lastName
  })

  return (
    <div className="flex px-4 py-2">
      <UserAvatar
        size={32}
        fullName={fullName}
        imageUrl={user.profilePicture.md}
        userId={user.id}
      />
      <div className="flex-grow ml-2 p-4 rounded-xl border shadow-sm bg-white">
        {text}
      </div>
    </div>
  )
}

export default Message
