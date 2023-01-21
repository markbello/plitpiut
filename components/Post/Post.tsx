import { usePathname } from 'next/navigation'
import { format } from 'date-fns'
import Link from 'next/link'
import { UserWithPostsAndBadges } from '../../types/User'
import { User } from '../User'
import { Post as PostType } from '@prisma/client'

export const Post = ({
  post,
  createdBy
}: {
  post: PostType
  createdBy: UserWithPostsAndBadges
}) => {
  const pathname = usePathname()

  return (
    <div className="rounded-xl bg-white py-4 shadow-sm mb-4">
      <div className="px-8">
        <div className="flex justify-between">
          <div className="flex">
            <User user={createdBy} />
          </div>
        </div>
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
      </div>
    </div>
  )
}
