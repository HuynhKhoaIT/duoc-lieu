import React from "react";
import classnames from "classnames";

import Button from "../../Button";
import Modal from "../Modal";

import styles from "./ConfirmModal.module.scss";

function ConfirmModal({
    onOpenChange,
    open = false,
    trigger,
    title,
    description,
    confirm,
    onConfirm = () => {},
    onCancel = () => {},
    confirmText,
    cancelText,
    note = <></>,
    zIndex,
    className = "",
}) {
    return (
        <Modal
            onOpenChange={onOpenChange}
            open={open}
            trigger={trigger && <Modal.Trigger>{trigger}</Modal.Trigger>}
            zIndex={zIndex}
        >
            <div className={classnames(styles.wrapper, className)}>
                <div className={styles.title}>{title}</div>
                <div className={styles.description}>{description}</div>
                <div className={styles.confirm}>{confirm}</div>
                {note && <div className={styles.note}>{note}</div>}
                <div className={styles.actions}>
                    <Button onClick={onCancel} type="outline">
                        {cancelText || "Hủy"}
                    </Button>
                    <Button onClick={onConfirm}>{confirmText || "Xác nhận"}</Button>
                </div>
            </div>
        </Modal>
    );
}

export default ConfirmModal;
