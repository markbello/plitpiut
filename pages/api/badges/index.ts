import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// @ts-ignore
export default async function handler(req, res) {
  await prisma.$connect()

  if (req.method === 'POST') {
    await prisma.badgeConnection.create({
      data: {
        userId: req.body.userId,
        badgeId: req.body.badgeId
      }
    })

    const updatedUser = await prisma.user.findUnique({
      where: { id: req.body.userId },
      include: { posts: true, badgeConnections: true }
    })

    return res.status(201).json(updatedUser)
  }
}
