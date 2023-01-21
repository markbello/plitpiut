import { Prisma } from '@prisma/client'
import { User } from './User'

export interface Post {
  id: string
  text: string
  createdAt: string
  createdBy: User
}

export type PostWithCreatedBy = Prisma.PostGetPayload<{
  include: {
    createdBy: { include: { badges: true; posts: true } }
  }
}>
