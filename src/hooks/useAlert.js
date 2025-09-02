// hooks/useAlert.js
"use client";
import Swal from "sweetalert2";

export default function useAlert() {
    const showAlert = (message, icon = "warning") => {
        Swal.fire({
            icon, // dynamic
            text: message,
            confirmButtonText: "OK",
            confirmButtonColor: "#004c49",
            background: "goldenrod",
            color: "#004c49",
            width: 380,
            didOpen: () => {
                const swalIcon = Swal.getIcon();
                if (swalIcon) {
                    swalIcon.style.borderColor = "#004c49";
                    swalIcon.style.color = "#004c49";
                }
            },
        });
    };

    return { showAlert };
}
