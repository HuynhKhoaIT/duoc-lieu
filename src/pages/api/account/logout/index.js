import { serialize } from "cookie";

export default function handler(req, res) {
    res.setHeader(
        "Set-Cookie",
        serialize("token", "", {
            path: "/", // xoá toàn bộ path
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            expires: new Date(0), // set expired
        }),
    );

    res.status(200).json({ success: true });
}
