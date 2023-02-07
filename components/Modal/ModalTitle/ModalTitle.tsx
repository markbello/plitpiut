import { FC, PropsWithChildren } from 'react'
import DismissIcon from '../../Icons/DismissIcon'

/** @description Can be used explicitly with custom content, or implicitly by providing a title
 * to the base Modal component
 */
const ModalTitle: FC<
  PropsWithChildren<{ isDismissable: boolean; onClose: () => void }>
> = ({ children, isDismissable, onClose }) => {
  return (
    <div className="flex border-b p-4 items-start">
      <div className="flex-grow pt-1">{children}</div>
      {isDismissable && (
        <button onClick={onClose} className="ml-4">
          <DismissIcon />
        </button>
      )}
    </div>
  )
}

export default ModalTitle
