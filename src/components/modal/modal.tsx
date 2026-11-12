import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { ModalOverlay } from '@components/modal-overlay/modal-overlay';

import styles from './modal.module.css';

type TModalProps = {
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
};

export const Modal = ({ title, onClose, children }: TModalProps): React.JSX.Element => {
  useEffect(() => {
    const onEsc = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', onEsc);

    return (): void => {
      document.removeEventListener('keydown', onEsc);
    };
  }, [onClose]);

  const modalRoot = document.getElementById('modal-root');

  if (!modalRoot) {
    return <></>;
  }

  return createPortal(
    <>
      <ModalOverlay onClose={onClose} />
      <div className={`${styles.modal} pt-10 pr-10 pb-15 pl-10`}>
        <div className={styles.header}>
          <h2 className="text text_type_main-large">{title}</h2>
          <CloseIcon type="primary" className={styles.close} onClick={onClose} />
        </div>
        {children}
      </div>
    </>,
    modalRoot
  );
};
