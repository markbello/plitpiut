import { Message } from '@prisma/client'
import axios from 'axios'
import { useQuery } from 'react-query'
import { QueryKeys } from './queryKeys'

export const useChatMessages = ({
  humanUserId,
  virtualUserId
}: {
  humanUserId: string
  virtualUserId: string
}) => {
  const handler = async () => {
    const response = await axios.get<Message[]>(`/api/chat/${virtualUserId}`, {
      headers: { userId: humanUserId }
    })

    if (response.status >= 400) {
      throw response
    }

    return response.data
  }

  return useQuery(
    [QueryKeys.GetMessagesForUser, humanUserId, virtualUserId],
    handler,
    { enabled: !!humanUserId && !!virtualUserId }
  )
}
