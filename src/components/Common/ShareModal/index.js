import {
    Close,
    Facebook,
    LinkedIn,
    Twitter,
    WhatsApp,
} from "@mui/icons-material";
import { toast } from "sonner";

import ModalBase from "../Modal/ModalBase";

import styles from "./index.module.scss";

export default function ShareModal({ shareUrl, isOpen, onClose }) {
    const copyToClipboard = () => {
        navigator.clipboard.writeText(shareUrl);
        toast.success("Sao chép thành công!");
    };
    return (
        <ModalBase isOpen={isOpen} onClose={onClose}>
            <div className={styles.modalContent}>
                <h2 className={styles.title}>Chia sẻ sản phẩm</h2>

                <div className={styles.socialButtons}>
                    <a
                        className={styles.facebook}
                        href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Facebook color="white" />
                        <span>Facebook</span>
                    </a>
                    <a
                        className={styles.linkedin}
                        href={`https://www.linkedin.com/shareArticle?url=${shareUrl}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <LinkedIn />
                        <span>Linkedin</span>
                    </a>
                    <a
                        className={styles.twitter}
                        href={`https://twitter.com/intent/tweet?url=${shareUrl}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Twitter />
                        <span>Twitter</span>
                    </a>
                    <a
                        className={styles.whatsapp}
                        href={`https://wa.me/?text=${shareUrl}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <WhatsApp />
                        <span>WhatsApp</span>
                    </a>
                </div>

                <div className={styles.copyLink}>
                    <input type="text" value={shareUrl} readOnly />
                    <button className="read-more-btn !flex items-center justify-center  gap-2 hover:cursor-pointer rounded-sm" onClick={copyToClipboard}>Sao chép</button>
                </div>

                <button className={styles.closeBtn} onClick={onClose}>
                    <Close color="var(--primary-color)"/>
                </button>
            </div>
        </ModalBase>
    );
}
