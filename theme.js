import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    typography: {
        fontFamily: "'Play', sans-serif",
    },
    palette: {
        primary: {
            main: "#FF7235",
            contrastText: "#FCF5EF",
        },
        text: {
            primary: "rgba(0, 0, 0, 1)", // Màu mặc định của Typography
            secondary: "rgba(0, 0, 0, 0.85)", // Màu phụ (thường dùng cho văn bản mờ hơn)
        },
    },
});

export default theme;
