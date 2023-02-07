import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'crypto'
import { createUserFromAuth0 } from '../../../../services/userService/createUserFromAuth0'

export const prisma = new PrismaClient()

// @ts-ignore
export default async function handler(req, res) {
  await prisma.$connect()

  if (req.method === 'POST') {
    const newlyCreatedUser = await createUserFromAuth0(req.body)

    return res.status(200).json(newlyCreatedUser)
  }
}
