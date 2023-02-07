import { FC, PropsWithChildren } from 'react'

const Card: FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className = ''
}) => {
  return (
    <div className={`rounded-xl bg-white p-4 shadow-sm ${className}`}>
      {children}
    </div>
  )
}

export default Card
