const isSessionStorageAvailable = () => {
    return typeof window !== "undefined" && window.sessionStorage;
};

export const getSessionData = (key) => {
    if (isSessionStorageAvailable()) {
        const dataStorage = window.sessionStorage.getItem(key);
        try {
            return JSON.parse(dataStorage);
        } catch (error) {
            console.error(`Error parsing sessionStorage data for key: ${key}`, error);
            return dataStorage;
        }
    }
    return null;
};

export const setSessionData = (key, data) => {
    if (isSessionStorageAvailable()) {
        const valueToStore = typeof data === "object" ? JSON.stringify(data) : data;
        window.sessionStorage.setItem(key, valueToStore);
    }
};

export const removeSessionItem = (key) => {
    if (isSessionStorageAvailable()) {
        window.sessionStorage.removeItem(key);
    }
};
