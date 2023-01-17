import { User } from './User'

export interface Post {
  id: string
  text: string
  createdAt: string
  createdBy: User
}
