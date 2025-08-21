import CloseIcon from "@mui/icons-material/Close";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";

export default function DialogDlbd({ open, onClose }) {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg" fullScreen>
            <DialogTitle>
                Đặt Lịch Bảo Dưỡng
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{ position: "absolute", right: 8, top: 8 }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers style={{ padding: 0 }}>
                <iframe
                    src="https://m.dlbd.vn"
                    width="100%"
                    height="100%"
                    style={{ border: "none" }}
                    title="Iframe Example"
                />
            </DialogContent>
        </Dialog>
    );
}
