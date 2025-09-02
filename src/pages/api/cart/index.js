// pages/api/carts/index.js
import apiConfig from "@/constants/apiConfig";

export default async function handler(req, res) {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        let response;

        switch (req.method) {
            case "GET": {
                response = await fetch(apiConfig.carts.getList.url, {
                    method: apiConfig.carts.getList.method,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                break;
            }

            case "POST": {
                response = await fetch(apiConfig.carts.create.url, {
                    method: apiConfig.carts.create.method,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(req.body),
                });
                break;
            }

            default:
                res.setHeader("Allow", [ "GET", "POST" ]);
                return res.status(405).end(`Method ${req.method} Not Allowed`);
        }

        const data = await response.json();
        res.status(response.status).json(data);
    } catch (err) {
        console.error("Error proxying carts:", err);
        res.status(500).json({ message: "Error proxying carts" });
    }
}
