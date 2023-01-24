import { Prisma } from '@prisma/client'

export interface Badge {
  createdAt: string
  updatedAt: string
  id: string
  title: string
  description: string
  imageName: string
}

export type BadgeWithUsersAndPosts = Prisma.BadgeGetPayload<{
  include: {
    badgeConnections: {
      include: {
        user: {
          include: { badges: true; posts: { include: { createdBy: true } } }
        }
      }
    }
  }
}>
