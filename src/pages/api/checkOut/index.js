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
        const response = await fetch(apiConfig.checkOut.create.url, {
            method: apiConfig.checkOut.create.method,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
            body: JSON.stringify(req.body),
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
            return res.status(401).json({ message: "Unauthorized" });
        }
        const data = await response.json();
        res.status(response.status).json(data);
    } catch (err) {
        console.error("Error fetching order:", err);
        res.status(500).json({ message: "Error fetching order" });
    }
}
