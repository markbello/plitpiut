import { PrismaClient } from '@prisma/client'
import {
  createUserFromAuth0,
  getUserBySub
} from '../../../../services/userService'

export const prisma = new PrismaClient()

// @ts-ignore
export default async function handler(req, res) {
  await prisma.$connect()

  if (req.method === 'GET') {
    const user = await getUserBySub(req.query.sub)

    if (!user) {
      return res.status(404)
    }

    return res.status(200).json(user)
  }

  if (req.method === 'POST') {
    const alreadyCreatedUser = await getUserBySub(req.body.sub)

    if (alreadyCreatedUser) {
      return res.status(200).json(alreadyCreatedUser)
    }

    const user = await createUserFromAuth0(req.body)

    return res.status(200).json(user)
  }
}
