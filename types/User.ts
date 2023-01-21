import { BadgeConnection, Prisma } from '@prisma/client'

export type Gender = 'MALE' | 'FEMALE' | 'NON_BINARY' | 'UNDISCLOSED'

export interface User {
  firstName: string
  lastName: string
  birthday: string
  profilePicture: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
  }
  gender: Gender
  id: string
  slug: string
  bio: string
  badges: BadgeConnection[]
}

export type UserWithPostsAndBadges = Prisma.UserGetPayload<{
  include: {
    posts: { include: { createdBy: true } }
    badges: { include: { badge: true } }
  }
}>
