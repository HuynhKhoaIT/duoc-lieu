export function setCookie(name, value, days = 365) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${encodeURIComponent(value)}; path=/${expires}`;
}

// Hàm lấy cookie
export function getCookie(name) {
    
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        const [ key, value ] = cookie.split("=");
        if (key === name) return decodeURIComponent(value);
    }
    return null;
}

// Hàm xoá cookie
export function removeCookie(name) {
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
}
