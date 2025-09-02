import { serialize } from "cookie";

import apiConfig from "@/constants/apiConfig";
export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.setHeader("Allow", [ "POST" ]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try {
        const { phone_number, password } = req.body;
        const result = await fetch(apiConfig.account.loginBasic.url, {
            method: "POST",
            body: JSON.stringify({ phone_number, password }),
            headers: { "Content-Type": "application/json" },
        }).then((r) => r.json());

        if (result.token) {
            res.setHeader(
                "Set-Cookie",
                serialize("token", result.token, {
                    path: "/",
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    maxAge: 60 * 60 * 24 * 365,
                }),
            );
            return res
                .status(200)
                .json({
                    success: true,
                    token: result.token,
                    user: result.data,
                });
        } else {
            return res.status(401).json({ success: false });
        }
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}
