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
            },
            body: JSON.stringify(req.body),
        });

        const data = await response.json();
        res.status(200).json(data);
    } catch (err) {
        console.error("Error fetching order:", err);
        res.status(500).json({ message: "Error fetching order" });
    }
}
