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
        const url = `${apiConfig.order.getList.url}?page=${page}&per_page=10`;

        const response = await fetch(url, {
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
