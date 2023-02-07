import { PrismaClient } from '@prisma/client'
import { getUserById } from '../../../../services/userService'

export const prisma = new PrismaClient()

// @ts-ignore
export default async function handler(req, res) {
  await prisma.$connect()

  if (req.method === 'GET') {
    const user = await getUserById(req.query.id)

    return res.status(200).json(user)
  }
}
