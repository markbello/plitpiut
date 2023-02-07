import { useUser } from '@auth0/nextjs-auth0/client'
import { Message as MessageType, User } from '@prisma/client'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { QueryKeys } from '../../queries/queryKeys'
import { useChatMessages } from '../../queries/useChatMessages'
import { useUserFromDb } from '../../queries/useUserFromDb'
import { UserWithBadges } from '../../types/User'
import LoadingWrapper from '../LoadingWrapper'
import Message from './Message'

const ChatWindow = ({
  plit,
  humanUserSub
}: {
  plit: User
  humanUserSub: string
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView()
  }

  const { user } = useUser()
  const { data: humanUser = {} as UserWithBadges, status: humanUserStatus } =
    useUserFromDb({
      queryBy: 'sub',
      sub: user?.sub!
    })
  const {
    data: virtualUser = {} as UserWithBadges,
    status: virtualUserStatus
  } = useUserFromDb({
    queryBy: 'id',
    id: plit.id
  })

  const [draftMessage, setDraftMessage] = useState('')

  const { data: messages = [] as MessageType[], refetch: refetchMessages } =
    useChatMessages({
      humanUserId: humanUser?.id!,
      virtualUserId: virtualUser?.id!
    })

  useEffect(() => {
    scrollToBottom()
  }, [messages.length])

  const { mutate: doCreateChatMessage, status: createChatMessageStatus } =
    useMutation({
      mutationKey: [QueryKeys.CreateMessage, virtualUser?.id, draftMessage],
      mutationFn: () =>
        axios.post<MessageType[]>('/api/chat', {
          humanUserId: humanUser?.id,
          virtualUserId: virtualUser?.id,
          text: draftMessage
        })
    })

  const handleCreateChatMessage = () => {
    messages.push({
      createdById: humanUser.id,
      recipientId: virtualUser.id,
      text: draftMessage,
      createdAt: new Date(),
      readAt: new Date(),
      id: 'New Message'
    })

    setDraftMessage('')

    doCreateChatMessage(undefined, {
      onSuccess: () => {
        refetchMessages()
      }
    })
  }

  return (
    <div className="bg-gray-100">
      <div className="h-96 overflow-y-auto">
        <LoadingWrapper queryStatuses={[humanUserStatus, virtualUserStatus]}>
          {messages.map((message) => (
            <Message
              user={
                message.createdById === humanUser?.id ? humanUser : virtualUser
              }
              text={message.text}
              key={message.id}
            />
          ))}
        </LoadingWrapper>
        <div ref={messagesEndRef} />
      </div>
      <form
        className="p-4 flex"
        onSubmit={(e) => {
          e.preventDefault()
          handleCreateChatMessage()
        }}
      >
        <input
          className="p-4 rounded-l-xl border border-r-0 flex-grow shadow-sm shadow-r-none"
          value={draftMessage}
          onChange={({ target: { value } }) => setDraftMessage(value)}
          autoFocus={true}
        />
        <button
          disabled={!draftMessage || createChatMessageStatus === 'loading'}
          type="submit"
          className="px-4 bg-white rounded-r-xl shadow-r-sm border border-l-0 uppercase text-xs font-semibold text-blue-700 disabled:text-gray-400"
        >
          Send
        </button>
      </form>
    </div>
  )
}

export default ChatWindow
