// pages/api/orders/[id]/feedback.js
import axios from "axios";
import { parse } from "cookie";

import apiConfig from "@/constants/apiConfig";

export default async function handler(req, res) {
    const { id } = req.query;
    const cookies = parse(req.headers.cookie || "");
    const token = cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    if (req.method !== "POST") {
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try {
        const response = await axios.post(
            apiConfig.feedback.create.url.replace(":id", id),
            req.body,
            { headers: { Authorization: `Bearer ${token}` } },
        );
        res.status(200).json(response.data);
    } catch (err) {
        console.error(err.response?.data || err.message);
        res.status(err.response?.status || 500).json({
            message: "Error sending feedback",
            error: err.response?.data || err.message,
        });
    }
}
