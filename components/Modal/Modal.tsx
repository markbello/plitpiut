import { FC, PropsWithChildren, useState } from 'react'
import ReactModal from 'react-modal'
import ModalTitle from './ModalTitle'

ReactModal.setAppElement('#__next')

const Modal: FC<
  PropsWithChildren<{
    isDismissable?: boolean
    onRequestClose: () => void
    isOpen?: boolean
    title?: string
  }>
> = ({
  children,
  onRequestClose,
  isDismissable = true,
  isOpen = false,
  title
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={isDismissable}
      shouldCloseOnEsc={isDismissable}
      className="rounded-xl bg-white border fixed w-sm shadow-lg"
      style={{
        content: {
          top: '25%',
          left: '50%',
          transform: 'translate(-50%, -25%)',
          maxWidth: '90%'
        }
      }}
    >
      {title && (
        <ModalTitle onClose={onRequestClose} isDismissable={isDismissable}>
          <div className="w-full text-center text-display4">{title}</div>
        </ModalTitle>
      )}
      {children}
    </ReactModal>
  )
}

export default Modal
