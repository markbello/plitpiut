import { PrismaClient } from '@prisma/client'
import { getMessagesForUser } from '../../../services/chatServices'

export const prisma = new PrismaClient()

// @ts-ignore
export default async function handler(req, res) {
  await prisma.$connect()

  if (req.method === 'GET') {
    const messages = await getMessagesForUser({
      humanUserId: req.headers.userId,
      virtualUserId: req.query.virtualUserId
    })

    return res.status(200).json(messages)
  }
}
