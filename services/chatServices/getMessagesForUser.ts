import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getMessagesForUser = async ({
  humanUserId,
  virtualUserId
}: {
  humanUserId: string
  virtualUserId: string
}) => {
  await prisma.$connect()

  const messages = await prisma.message.findMany({
    where: {
      OR: [
        { AND: [{ createdById: humanUserId, recipientId: virtualUserId }] },
        { AND: [{ createdById: virtualUserId, recipientId: humanUserId }] }
      ]
    },
    orderBy: { createdAt: 'asc' }
  })

  return messages
}
