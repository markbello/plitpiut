import { PrismaClient } from '@prisma/client'
import axios from 'axios'

const prisma = new PrismaClient()

export const getUserBySub = async (sub: string) => {
  await prisma.$connect()

  const user = await prisma.user.findFirst({
    where: { humanUserSub: sub },
    include: { badgeConnections: { include: { badge: true } } }
  })

  return user
}
