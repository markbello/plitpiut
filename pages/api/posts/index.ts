import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

// @ts-ignore
export default async function handler(req, res) {
  await prisma.$connect()

  if (req.method === 'GET') {
    const posts = await prisma.post.findMany({
      include: { createdBy: true },
      take: 50
    })

    return res.status(200).json(posts)
  }
}
