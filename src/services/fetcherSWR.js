
import { storageKeys } from "@/constants";
import paths from "@/constants/paths";

const fetcherSWR = async (url) => {
    const res = await fetch(url, { credentials: "include" });

    if (res.status === 401) {
        localStorage.removeItem(storageKeys.IS_LOGIN);
        localStorage.removeItem(storageKeys.PROFILE);

        window.location.href = paths.login; 

        throw new Error("Unauthorized");
    }

    if (!res.ok) {
        const error = new Error("An error occurred while fetching data.");
        error.status = res.status;
        throw error;
    }

    return res.json();
};

export default fetcherSWR;
