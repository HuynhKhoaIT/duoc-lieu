"use client";
import Swal from "sweetalert2";

export default function useAlert() {
    const PRIMARY_COLOR = "#004c49";
    const SUB_PRIMARY_COLOR = "goldenrod";

    const showAlert = (message, icon = "warning") => {
        Swal.fire({
            icon, 
            text: message,
            confirmButtonText: "OK",
            confirmButtonColor: PRIMARY_COLOR,
            background: SUB_PRIMARY_COLOR,
            color: PRIMARY_COLOR,
            width: 380,
            didOpen: () => {
                const swalIcon = Swal.getIcon();
                if (!swalIcon) return;

                // Màu chung cho tất cả icon
                swalIcon.style.borderColor = PRIMARY_COLOR;
                swalIcon.style.color = PRIMARY_COLOR;

                /** ================================
                 *  Success Icon Customization
                 *  ================================ */
                if (icon === "success") {
                    const successRing = swalIcon.querySelector(
                        ".swal2-success-ring",
                    );
                    const successLineTip = swalIcon.querySelector(
                        ".swal2-success-line-tip",
                    );
                    const successLineLong = swalIcon.querySelector(
                        ".swal2-success-line-long",
                    );

                    if (successRing)
                        successRing.style.borderColor = PRIMARY_COLOR;
                    if (successLineTip)
                        successLineTip.style.backgroundColor = PRIMARY_COLOR;
                    if (successLineLong)
                        successLineLong.style.backgroundColor = PRIMARY_COLOR;
                }

                /** ================================
                 *  Error Icon Customization
                 *  ================================ */
                if (icon === "error") {
                    const xMark = swalIcon.querySelector(".swal2-x-mark");
                    const xMarkLines =
                        swalIcon.querySelectorAll(".swal2-x-mark-line");

                    // Vòng ngoài
                    if (xMark) xMark.style.borderColor = PRIMARY_COLOR;

                    // Hai đường chéo
                    xMarkLines.forEach((line) => {
                        line.style.backgroundColor = PRIMARY_COLOR;
                    });
                }
            },
        });
    };

    return { showAlert };
}
