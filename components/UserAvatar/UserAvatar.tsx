import Image from 'next/image'
import Link from 'next/link'

const UserAvatar = ({
  fullName,
  imageUrl,
  userId,
  size = 64
}: {
  fullName: string
  imageUrl: string
  userId: string
  size?: number
}) => {
  return (
    <Link href={`/users/${userId}`}>
      <Image
        src={imageUrl}
        className="rounded-full"
        width={size}
        height={size}
        alt={fullName}
      />
    </Link>
  )
}

export default UserAvatar
