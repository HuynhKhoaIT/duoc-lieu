"use client";

import React from "react";

import styles from "./ModalBase.module.scss";

const ModalBase = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.modal}>
            <div className={styles.modalDialog}>
                <div className={styles.modalContent}>{children}</div>
            </div>
        </div>
    );
};

export default ModalBase;
