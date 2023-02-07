export const getFullName = ({
  firstName = '',
  lastName = ''
}: {
  firstName?: string
  lastName?: string
}) => `${firstName} ${lastName}`.trim()
