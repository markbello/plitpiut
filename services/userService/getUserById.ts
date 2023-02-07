import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getUserById = async (id: string) => {
  await prisma.$connect()

  const user = await prisma.user.findFirst({
    where: { id },
    include: { badgeConnections: { include: { badge: true } } }
  })

  return user
}
