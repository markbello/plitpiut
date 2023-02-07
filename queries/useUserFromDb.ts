import axios from 'axios'
import { useQuery, useQueryClient } from 'react-query'
import { UserWithBadges } from '../types/User'
import { QueryKeys } from './queryKeys'

export const useUserFromDb = (
  params: { id: string; queryBy: 'id' } | { sub: string; queryBy: 'sub' }
) => {
  const handler =
    params.queryBy === 'id'
      ? async () => {
          const response = await axios.get<UserWithBadges>(
            `/api/users/id/${params.id}`
          )

          if (response?.status >= 400) {
            throw response
          }

          return response?.data
        }
      : async () => {
          const response = await axios.get<UserWithBadges>(
            `/api/users/sub/${params.sub}`
          )

          if (response?.status >= 400) {
            throw response
          }

          return response?.data
        }

  const queryClient = useQueryClient()

  return useQuery(
    [
      QueryKeys.GetUser,
      params.queryBy,
      params.queryBy === 'id' ? params.id : params.sub
    ],
    handler,
    {
      onSuccess: (user) => {
        if (params.queryBy === 'sub') {
          queryClient.setQueryData(
            [QueryKeys.GetUser, 'id', user?.id as string],
            () => user
          )
        }
      },
      onError: console.log,
      enabled:
        (params.queryBy === 'id' && !!params.id) ||
        (params.queryBy === 'sub' && !!params.sub)
    }
  )
}
