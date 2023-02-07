import { Prisma } from '@prisma/client'

export type Gender = 'MALE' | 'FEMALE' | 'NON_BINARY' | 'UNDISCLOSED'

export type UserWithPostsAndBadges = Prisma.UserGetPayload<{
  include: {
    posts: { include: { createdBy: true } }
    badgeConnections: { include: { badge: true } }
  }
}>

export type UserWithBadges = Prisma.UserGetPayload<{
  include: {
    badgeConnections: { include: { badge: true } }
  }
}>
