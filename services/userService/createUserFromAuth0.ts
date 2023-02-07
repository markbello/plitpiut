import { UserProfile } from '@auth0/nextjs-auth0/client'
import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'crypto'

export const prisma = new PrismaClient()

export const createUserFromAuth0 = async (user: UserProfile) => {
  await prisma.$connect()

  const newlyCreatedUser = await prisma.user.create({
    data: {
      firstName: (user.given_name as string) ?? user.name ?? 'User',
      lastName: (user.family_name as string) ?? randomUUID().slice(0, 4),
      gender: 'UNDISCLOSED',
      bio: '',
      birthday: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      profilePicture: {
        xs: user?.picture ?? '/images/male-avatar-1.png',
        sm: user?.picture ?? '/images/male-avatar-1.png',
        md: user?.picture ?? '/images/male-avatar-1.png',
        lg: user?.picture ?? '/images/male-avatar-1.png',
        xl: user?.picture ?? '/images/male-avatar-1.png'
      },
      slug: `${user.nickname}-${randomUUID()}`,
      humanUserSub: user.sub
    }
  })

  return newlyCreatedUser
}
