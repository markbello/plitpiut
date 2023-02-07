import { FC, PropsWithChildren } from 'react'

const ModalContent: FC<PropsWithChildren> = ({ children }) => (
  <div className="p-4 max-w-full">{children}</div>
)

export default ModalContent
