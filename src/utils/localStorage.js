export const getLocalData = (key) => {
    if (typeof window !== "undefined" && window.localStorage) {
        const dataStorage = window.localStorage.getItem(key);
        try {
            return JSON.parse(dataStorage);
        } catch (error) {
            return dataStorage;
        }
    }
    return false;
};

export const setLocalData = (key, data) => {
    if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.setItem(key, typeof data === "object" ? JSON.stringify(data) : data);
    }
};

export const removeLocalItem = (key) => {
    if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.removeItem(key);
    }
};
