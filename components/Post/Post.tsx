import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { format } from 'date-fns'
import { Post as PostType } from '../../types/Post'
import Link from 'next/link'
import { User } from '../../types/User'

export const Post = ({
  post,
  createdBy
}: {
  post: PostType
  createdBy: User
}) => {
  const pathname = usePathname()
  const creatorFullName = `${createdBy.firstName} ${createdBy.lastName}`.trim()

  return (
    <div className="rounded-xl bg-white py-4 shadow-sm mb-4">
      <div className="px-8">
        <div className="flex justify-between">
          <div className="flex">
            <Image
              src={createdBy.profilePicture.sm}
              className="h-16 w-16 rounded-full"
              width={64}
              height={64}
              alt={creatorFullName}
            />
            <div className="ml-4">
              <div className="flex items-center text-lg font-semibold">
                {pathname?.includes(`/users/${createdBy.id}`) ? (
                  <div>{creatorFullName}</div>
                ) : (
                  <Link href={`/users/${createdBy.id}`}>{creatorFullName}</Link>
                )}
              </div>
              <div className="text-sm text-gray-700">
                <div>{format(new Date(post.createdAt), 'PPP')}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="my-2">{post.text}</div>
        <div className="text-sm text-gray-700">
          {pathname?.includes(`/posts/${post.id}`) ? (
            <Link href={`/users/${createdBy.id}`}>View Profile</Link>
          ) : (
            <Link href={`/posts/${post.id}`}>View Post</Link>
          )}
        </div>
      </div>
    </div>
  )
}
