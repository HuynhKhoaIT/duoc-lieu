import apiConfig from "@/constants/apiConfig";

export default async function handler(req, res) {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const { id } = req.query;
    const targetUrl = (url) => url.replace(":id", id);

    try {
        let response;

        switch (req.method) {
            case "GET": {
                response = await fetch(targetUrl(apiConfig.carts.getById.url), {
                    method: apiConfig.carts.getById.method,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                break;
            }

            case "PUT": {
                response = await fetch(targetUrl(apiConfig.carts.update.url), {
                    method: apiConfig.carts.update.method,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(req.body),
                });
                break;
            }

            case "DELETE": {
                response = await fetch(targetUrl(apiConfig.carts.delete.url), {
                    method: apiConfig.carts.delete.method,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                break;
            }

            default:
                res.setHeader("Allow", [ "GET", "PUT", "DELETE" ]);
                return res.status(405).end(`Method ${req.method} Not Allowed`);
        }

        const data = await response.json();
        res.status(response.status).json(data);
    } catch (err) {
        console.error("Error proxying cart by id:", err);
        res.status(500).json({ message: "Error proxying cart by id" });
    }
}
