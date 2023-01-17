import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

// @ts-ignore
export default async function handler(req, res) {
  await prisma.$connect()

  if (req.method === 'GET') {
    const post = await prisma.post.findFirst({
      where: { id: req.query.id },
      include: { createdBy: true }
    })

    return res.status(200).json(post)
  }
}
