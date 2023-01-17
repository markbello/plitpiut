import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// @ts-ignore
export default async function handler(req, res) {
  await prisma.$connect()

  // if (req.method === 'PUT') {
  //   const { Item } = await client.send(
  //     new PutItemCommand({
  //       TableName: process.env.TABLE_NAME,
  //       Item: {
  //         id: { S: uuid.v4() },
  //         content: { S: req.body.content }
  //       }
  //     })
  //   )

  //   return res.status(201).json(Item)
  // }

  if (req.method === 'GET') {
    // const User = dbClient.getModel<UserType>('User')
    // const { Item } = await client.send(
    //   new GetItemCommand({
    //     TableName: process.env.TABLE_NAME,
    //     Key: {
    //       id: { S: req.query.id }
    //     }
    //   })
    // );
    const item = await prisma.user.findFirst()

    return res.status(200).json(item)
  }

  // if (req.method === 'POST') {
  //   const { Attributes } = await client.send(
  //     new UpdateItemCommand({
  //       TableName: process.env.TABLE_NAME,
  //       Key: {
  //         id: { S: req.body.id }
  //       },
  //       UpdateExpression: 'set content = :c',
  //       ExpressionAttributeValues: {
  //         ':c': { S: req.body.content }
  //       },
  //       ReturnValues: 'ALL_NEW'
  //     })
  //   )

  //   return res.status(200).json(Attributes)
  // }

  // if (req.method === 'DELETE') {
  //   await client.send(
  //     new DeleteItemCommand({
  //       TableName: process.env.TABLE_NAME,
  //       Key: {
  //         id: { S: req.body.id }
  //       }
  //     })
  //   )

  //   return res.status(204).json({})
  // }
}
