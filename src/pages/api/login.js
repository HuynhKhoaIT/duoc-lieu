// pages/api/login.js
import { serialize } from "cookie";

import apiConfig from "@/constants/apiConfig";

export default async function handler(req, res) {
    const { phone_number, password } = req.body;

    // Gọi API backend thực sự để check login
    const result = await fetch(apiConfig.account.loginBasic.url, {
        method: "POST",
        body: JSON.stringify({ phone_number, password }),
        headers: { "Content-Type": "application/json" },
    }).then((r) => r.json());

    console.log("result", result);
    if (result.token) {
        res.setHeader(
            "Set-Cookie",
            serialize("token", result.token, {
                path: "/",
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 60 * 60 * 24 * 365, // 365 ngày
            }),
        );
        res.status(200).json({
            success: true,
            token: result.token,
            user: result.user,
        });
    } else {
        res.status(401).json({ success: false });
    }
}
