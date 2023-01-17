import Image from 'next/image'
import { format } from 'date-fns'
import { Post as PostType } from '../../types/Post'

export const Post = ({ post }: { post: PostType }) => {
  const creatorFullName =
    `${post.createdBy.firstName} ${post.createdBy.lastName}`.trim()

  return (
    <div className="rounded-xl bg-white py-4 shadow-sm mb-4">
      <div className="px-8">
        <div className="flex justify-between">
          <div className="flex">
            <Image
              src={post.createdBy.profilePicture.sm}
              className="h-16 w-16 rounded-full"
              width={64}
              height={64}
              alt={creatorFullName}
            />
            <div className="ml-4">
              <div className="flex items-center">
                <div className="text-lg font-semibold">{creatorFullName}</div>
              </div>
              <div className="text-sm text-gray-700">
                {format(new Date(post.createdAt), 'PPPp')}
              </div>
              <div className="mt-2">{post.text}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
