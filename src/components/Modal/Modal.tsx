import { type ReactNode } from 'react';
import { useModal } from '../../hooks/useModal/useModal.ts';
import { createPortal } from 'react-dom';
import { useClickableBlock } from '../../hooks/useClickableBlock/useClickableBlock.ts';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const { mountNode, backdropRef, backdropProps } = useModal({
    isOpen,
    onClose,
  });

  const mainProps = useClickableBlock({
    stopPropagation: true,
  });

  if (!isOpen) return null;

  if (!mountNode) {
    console.warn(
      'PortalContext not found! Wrap the application in ModalPortalProvider.'
    );
    return null;
  }

  return createPortal(
    <div
      ref={backdropRef}
      {...backdropProps}
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 bg-black/50 flex flex-col items-center justify-center z-50"
    >
      <header className="header-container">
        <button
          aria-label="Close"
          className="button button--error button--icon"
          onClick={onClose}
        >
          <svg>
            <use href="/icons.svg#close" />
          </svg>
        </button>
      </header>
      <main {...mainProps} className="main">
        {children}
      </main>
    </div>,
    mountNode
  );
};

export default Modal;
