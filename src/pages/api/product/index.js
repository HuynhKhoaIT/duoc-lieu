// pages/api/products/index.js
import apiConfig from "@/constants/apiConfig";

export default async function handler(req, res) {

    try {
        let response;

        switch (req.method) {
            case "GET": {
                response = await fetch(apiConfig.products.getList.url+'?per_page=999', {
                    method: apiConfig.products.getList.method,
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                break;
            }

            default:
                res.setHeader("Allow", [ "GET" ]);
                return res.status(405).end(`Method ${req.method} Not Allowed`);
        }

        const data = await response.json();
        res.status(response.status).json(data);
    } catch (err) {
        console.error("Error proxying carts:", err);
        res.status(500).json({ message: "Error proxying carts" });
    }
}
