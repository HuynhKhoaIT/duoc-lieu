import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import cls from 'classnames';

import useUncontrolled from '@/hooks/useUncontrolled';

import styles from './Modal.module.scss';

const Modal = ({
    trigger,
    onOpenChange,
    children,
    open,
    className,
    style,
    zIndex,
    maskClosable = true,
    dialogTitle,
}) => {
    const [ _open, _onOpenChange ] = useUncontrolled({ value: open, onChange: onOpenChange });
    return (
        <Dialog.Root open={_open} onOpenChange={(value) => _onOpenChange(value)}>
            {trigger}
            <Dialog.Portal>
                <Dialog.Overlay
                    className={styles.overlay}
                    style={{
                        zIndex,
                    }}
                />
                <Dialog.Title className="DialogTitle">{dialogTitle}</Dialog.Title>
                <Dialog.Content
                    style={style}
                    tabIndex="none"
                    onInteractOutside={(e) => !maskClosable && e.preventDefault()}
                    className={cls(styles.content, className)}
                >
                    {children}
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

function Root({
    trigger,
    onOpenChange,
    onClose,
    children,
    open,
    className,
    classNames = {},
    style,
    zIndex,
    maskClosable = true,
    centered = true,
    width = '70rem',
}) {
    return (
        <Dialog.Root
            open={open}
            onOpenChange={(value) => {
                onOpenChange(value);
                !value && onClose?.();
            }}
        >
            {trigger}
            <Dialog.Portal>
                <Dialog.Overlay
                    className={styles.overlay}
                    style={{
                        zIndex,
                    }}
                />
                <Dialog.Content
                    style={{ ...style, '--modal-width': width }}
                    tabIndex="none"
                    onInteractOutside={(e) => !maskClosable && e.preventDefault()}
                    className={cls(styles.modal, className, classNames.root)}
                >
                    <div data-centered={centered} className={cls(styles.modalInner, classNames.inner)}>
                        <div className={cls(styles.modalContent, classNames.content)}>{children}</div>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

const Trigger = ({ children }) => <Dialog.Trigger asChild>{children}</Dialog.Trigger>;

const Close = ({ children }) => <Dialog.Close asChild>{children}</Dialog.Close>;

function Header({ title, className, classNames = {}, children }) {
    return (
        <div className={cls(styles.modalHeader, className, classNames.header)}>
            {children || <div className={cls(styles.modalTitle, classNames.title)}>{title}</div>}
        </div>
    );
}

function Body({ children, className }) {
    return <div className={cls(styles.modalBody, className)}>{children}</div>;
}

function Footer({ children }) {
    return <div className={styles.modalFooter}>{children}</div>;
}

Modal.Root = Root;
Modal.Trigger = Trigger;
Modal.Close = Close;
Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
