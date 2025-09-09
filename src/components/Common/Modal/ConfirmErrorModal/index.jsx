import ModalBase from "../ModalBase";

import styles from "../index.module.css";

export default function ConfirmErrorModal({ isOpen, onClose }) {
    return (
        <ModalBase isOpen={isOpen} onClose={onClose}>
            <div
                className="swal2-popup grid w-[400px] bg-[goldenrod] text-[#004c49]"
            >
                {/* Icon */}
                <div className="swal2-icon flex border-2 border-[#004c49] text-[#004c49]">
                    <div className="swal2-icon-content">!</div>
                </div>

                {/* Nội dung */}
                <div className="swal2-html-container block">
                    Xác minh không chính xác
                </div>

                {/* Actions */}
                <div className="swal2-actions flex">
                    <button
                        type="button"
                        className="swal2-confirm swal2-styled bg-[#004c49] text-white px-4 py-2 rounded focus:ring-2 focus:ring-[#004c49]/50"
                    >
                        OK
                    </button>
                </div>
            </div>
        </ModalBase>
    );
}
