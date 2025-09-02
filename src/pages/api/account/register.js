import axios from "axios";

import apiConfig from "@/constants/apiConfig";

export default async function handler(req, res) {
    const token = req.cookies.token;

    if (req.method !== "POST") {
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try {
        const response = await axios.post(
            apiConfig.account.register.url,
            req.body,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        console.log("response",response);

        // trả về y chang backend để client nhận token + user
        res.status(response.status).json(response.data);
    } catch (err) {
        console.error(err.response?.data || err.message);
        res.status(err.response?.status || 500).json({
            message: "Error registering account",
            error: err.response?.data || err.message,
        });
    }
}
