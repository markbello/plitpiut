import { Prisma, User } from '@prisma/client'

export interface Post {
  id: string
  text: string
  createdAt: string
  createdBy: User
}

export type PostWithCreatedBy = Prisma.PostGetPayload<{
  include: {
    createdBy: { include: { badgeConnections: true; posts: true } }
  }
}>
