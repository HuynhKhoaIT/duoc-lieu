import apiConfig from "@/constants/apiConfig";

export default async function handler(req, res) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const response = await fetch(apiConfig.order.getList.url, {
            method: apiConfig.order.getList.method,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await response.json();
        res.status(200).json(data);
    } catch (err) {
        console.error("Error fetching order:", err);
        res.status(500).json({ message: "Error fetching order" });
    }
}
