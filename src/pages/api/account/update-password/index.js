import { serialize } from "cookie";

import apiConfig from "@/constants/apiConfig";

export default async function handler(req, res) {
    const token = req.cookies.token;
    if (req.method !== "POST") {
        res.setHeader("Allow", [ "POST" ]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const response = await fetch(apiConfig.account.updatePassword.url, {
            method: apiConfig.account.updatePassword.method,
            body: JSON.stringify(req.body),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        });
        if (response.status === 401) {
            res.setHeader(
                "Set-Cookie",
                serialize("token", "", {
                    path: "/",
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    expires: new Date(0),
                }),
            );
        }
        const data = await response.json();
        if (data.data.token) {
            res.setHeader(
                "Set-Cookie",
                serialize("token", data.data.token, {
                    path: "/",
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    maxAge: 60 * 60 * 24 * 365,
                }),
            );
        }

        res.status(200).json(data);
    } catch (err) {
        console.error("Error fetching order:", err);
        res.status(500).json({ message: "Error fetching order" });
    }
}
