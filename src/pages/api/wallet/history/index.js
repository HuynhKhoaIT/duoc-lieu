import { serialize } from "cookie";

import apiConfig from "@/constants/apiConfig";

export default async function handler(req, res) {
    const token = req.cookies.token;

    if (req.method !== "GET") {
        res.setHeader("Allow", [ "GET" ]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const { page = 1 } = req.query;

        const url = `${apiConfig.wallet.history.url}?page=${page}`;

        const response = await fetch(url, {
            method: apiConfig.wallet.history.method,
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
            return res.status(401).json({ message: "Unauthorized" });
        }
        const data = await response.json();

        // Trả dữ liệu về client
        res.status(response.status).json(data);
    } catch (err) {
        console.error("Error fetching wallet history:", err);
        res.status(500).json({ message: "Error fetching data" });
    }
}
