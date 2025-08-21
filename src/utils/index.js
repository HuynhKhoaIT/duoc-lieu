import CryptoJS from "crypto-js";

export function generatePath(originalPath, params = {}) {
    let path = originalPath;
    if (path.endsWith("*") && path !== "*" && !path.endsWith("/*")) {
        warning(
            false,
            `Route path "${path}" will be treated as if it were ` +
                `"${path.replace(/\*$/, "/*")}" because the \`*\` character must ` +
                `always follow a \`/\` in the pattern. To get rid of this warning, ` +
                `please change the route path to "${path.replace(/\*$/, "/*")}".`,
        );
        path = path.replace(/\*$/, "/*");
    }

    // ensure `/` is added at the beginning if the path is absolute
    const prefix = path.startsWith("/") ? "/" : "";

    const segments = path
        .split(/\/+/)
        .map((segment, index, array) => {
            const isLastSegment = index === array.length - 1;

            // only apply the splat if it's the last segment
            if (isLastSegment && segment === "*") {
                const star = "*";
                const starParam = params[star];

                // Apply the splat
                return starParam;
            }

            const keyMatch = segment.match(/^:(\w+)(\??)$/);
            if (keyMatch) {
                const [ , key, optional ] = keyMatch;
                let param = params[key];

                if (optional === "?") {
                    return param == null ? "" : param;
                }

                if (param == null) {
                    invariant(false, `Missing ":${key}" param`);
                }

                return param;
            }

            // Remove any optional markers from optional static segments
            return segment.replace(/\?$/g, "");
        })
        // Remove empty segments
        .filter((segment) => !!segment);

    return prefix + segments.join("/");
}

function warning(cond, message) {
    if (!cond) {
        // eslint-disable-next-line no-console
        if (typeof console !== "undefined") console.warn(message);

        try {
            // Welcome to debugging history!
            //
            // This error is thrown as a convenience so you can more easily
            // find the source for a warning that appears in the console by
            // enabling "pause on exceptions" in your JavaScript debugger.
            throw new Error(message);
            // eslint-disable-next-line no-empty
        } catch (e) {}
    }
}

function invariant(value, message) {
    if (value === false || value === null || typeof value === "undefined") {
        throw new Error(message);
    }
}

export const cleanObject = (obj) => {
    const result = {};
    if (obj) {
        Object.keys(obj).forEach((key) => {
            if ((!Array.isArray(obj[key]) && obj[key]) || obj[key]?.length)
                result[key] = obj[key];
        });
    }
    return result;
};
export const formatPrice = (value) => {
    if (!value) return "";
    const numberValue = Number.parseFloat(
        value.toString().replace(/[^0-9]/g, ""),
    );
    return isNaN(numberValue) ? "" : numberValue.toLocaleString("vi-VN");
};
// const SECRET_KEY = CryptoJS.enc.Base64.parse(process.env.AES_KEY);

export const decryptLaravelData = (encryptedData,SECRET_KEY) => {
    try {
        if (!encryptedData) {
            throw new Error("Dữ liệu mã hóa không tồn tại");
        }

        // Giải mã Base64 để lấy payload JSON
        const payload = JSON.parse(
            CryptoJS.enc.Base64.parse(encryptedData).toString(CryptoJS.enc.Utf8),
        );

        const { iv, value, mac } = payload;

        // Tính toán MAC
        const calculatedMac = CryptoJS.HmacSHA256(
            iv + value,
            SECRET_KEY,
        ).toString(CryptoJS.enc.Hex);

        if (calculatedMac !== mac) {
            throw new Error("MAC không hợp lệ - Dữ liệu có thể đã bị thay đổi");
        }

        // Giải mã AES-256-CBC với IV
        const bytes = CryptoJS.AES.decrypt(
            { ciphertext: CryptoJS.enc.Base64.parse(value) },
            SECRET_KEY,
            {
                iv: CryptoJS.enc.Base64.parse(iv),
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7,
            },
        );

        const decrypted = bytes.toString(CryptoJS.enc.Utf8);
        if (!decrypted) {
            throw new Error("Dữ liệu giải mã rỗng hoặc không hợp lệ");
        }

        return JSON.parse(decrypted);
    } catch (error) {
        console.error("Lỗi giải mã:", error.message);
        return null;
    }
};


export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

export function timeAgo(timestamp) {
    const now = new Date();
    const past = new Date(timestamp);
    const diffInSeconds = Math.floor((now - past) / 1000);

    const secondsInMinute = 60;
    const secondsInHour = 60 * secondsInMinute;
    const secondsInDay = 24 * secondsInHour;
    const secondsInMonth = 30 * secondsInDay;

    if (diffInSeconds < secondsInMinute) {
        return `${diffInSeconds} giây trước`;
    } else if (diffInSeconds < secondsInHour) {
        return `${Math.floor(diffInSeconds / secondsInMinute)} phút trước`;
    } else if (diffInSeconds < secondsInDay) {
        return `${Math.floor(diffInSeconds / secondsInHour)} giờ trước`;
    } else if (diffInSeconds < secondsInMonth) {
        return `${Math.floor(diffInSeconds / secondsInDay)} ngày trước`;
    } else {
        const months = Math.floor(diffInSeconds / secondsInMonth);
        const days = Math.floor((diffInSeconds % secondsInMonth) / secondsInDay);
        return `${months} tháng ${days} ngày trước`;
    }
}