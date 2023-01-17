export type Gender = 'MALE' | 'FEMALE' | 'NON_BINARY' | 'UNDISCLOSED'

export interface User {
  firstName: string
  lastName: string
  birthday: string
  profilePicture: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
  }
  gender: Gender
  id: string
  slug: string
}
