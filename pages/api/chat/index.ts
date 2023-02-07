import { InworldClient, InworldPacket } from '@inworld/nodejs-sdk'
import { PrismaClient } from '@prisma/client'
import { getFullName } from '../../../utils/getFullName'

export const prisma = new PrismaClient()

// @ts-ignore
export default async function handler(req, res) {
  await prisma.$connect()

  if (req.method === 'POST') {
    const humanUser = await prisma.user.findUnique({
      where: { id: req.body.humanUserId as string }
    })
    const humanUserFullname = getFullName({
      firstName: humanUser?.firstName,
      lastName: humanUser?.lastName
    })

    const virtualUser = await prisma.user.findUnique({
      where: { id: req.body.virtualUserId }
    })

    const incomingMessage = await prisma.message.create({
      data: {
        text: req.body.text,
        createdById: req.body.humanUserId,
        recipientId: req.body.virtualUserId
      }
    })

    const client = new InworldClient()
      // Get key and secret from the integrations page.
      .setApiKey({
        key: process.env.INWORLD_KEY!,
        secret: process.env.INWORLD_SECRET!
      })
      // Setup a user name.
      // It allows character to call you by name.
      .setUser({ fullName: humanUserFullname })
      // Setup required capabilities.
      // In this case you can receive character emotions.
      .setConfiguration({
        capabilities: { emotions: true, audio: false }
      })
      // Use a full character name.
      // It should be like workspaces/{WORKSPACE_NAME}/characters/{CHARACTER_NAME}.
      // Or like workspaces/{WORKSPACE_NAME}/scenes/{SCENE_NAME}.
      .setScene(
        `workspaces/${process.env
          .INWORLD_WORKSPACE!}/characters/${virtualUser?.firstName?.toLowerCase()}_${virtualUser?.lastName?.toLowerCase()}`
      )
      // Attach handlers
      .setOnError((err: Error) => console.error(err))
      // @ts-ignore
      .setOnMessage(async (packet: InworldPacket) => {
        if (packet.isText() && packet.text.final) {
          const responseMessage = await prisma.message.create({
            data: {
              text: packet.text.text,
              createdById: req.body.virtualUserId,
              recipientId: req.body.humanUserId
            }
          })
          res.status(201).send([incomingMessage, responseMessage])
        }

        // Close connection.
        connection.close()
      })

    // Finish connection configuration.
    const connection = client.build()

    // Send your message to a character.
    await connection.sendText(req.body.text)
  }
}
