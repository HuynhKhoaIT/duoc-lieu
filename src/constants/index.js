export const ssrMode = typeof window === "undefined";
export const appMode = process.env.NEXT_PUBLIC_APP_MODE;
export const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const appName = "duoc-lieu-xanh";
export const DEFAULT_LOCALE = "vi";

export const DATE_DISPLAY_FORMAT = "DD-MM-YYYY HH:mm";
export const DATE_SHORT_MONTH_FORMAT = "DD MMM YYYY";
export const TIME_FORMAT_DISPLAY = "HH:mm";
export const DATE_FORMAT_VALUE = "DD/MM/YYYY";
export const DATE_FORMAT_DISPLAY = "DD/MM/YYYY";
export const DEFAULT_FORMAT = "DD/MM/YYYY HH:mm:ss";
export const DATE_FORMAT_ZERO_TIME = "DD/MM/YYYY 00:00:00";
export const DATE_FORMAT_END_OF_DAY_TIME = "DD/MM/YYYY 23:59:59";
export const DEFAULT_EXCEL_DATE = "DDMMYYHHmmss";
export const DEFAULT_FORMAT_DAY_OFF_LOG = "DD/MM/YYYY HH:mm:00";
export const DEFAULT_FORMAT_ZERO_SECOND = "DD/MM/YYYY HH:mm:00";

export const storageKeys = {
    TOKEN: `${appName}-token`,
    PROFILE: `${appName}-profile`,
    IS_LOGIN: `${appName}-isLogin`,
    CART_DATA: `${appName}-cartData`,
    REFERRAL_PHONE:  `${appName}-referral-phone`,
};

export const ROLES_CODE = {
    SUPER_ADMIN: "SUPER_ADMIN",
    ADMIN: "ADMIN",
    TEACHER: "TEACHER",
    STUDENT: "STUDENT",
    PARENT: "PARENT",
};

export const metaDefaults = {
    title: "Dược liệu xanh",
    description: "Dược Liệu Xanh An Lành Cho Sức Khỏe",
    image: "/images/logo.png",
};

export const statusOrderOptions = {
    pending: "Chờ xử lý",
    paid: "Đã thanh toán",
    shipped: "Đang giao",
    completed: "Hoàn tất",
    cancelled: "Đã hủy",
};

export const agentLevelOptions = {
    0: "Cộng tác viên",
    1: "CTV *",
    2: "CTV **",
    3: "CTV ***",
    4: "CTV ****",
    5: "CTV *****",
};



export const userStatusOptions = [
    { 
        label: "Hoạt động", 
        value: "active", 
        color: "#00FF7F",
        icon: "fas fa-check",
    },
    { 
        label: "Gần hết hạn", 
        value: "expiring_soon", 
        color: "#daa520",
        icon: "fa-solid fa-exclamation",
    },
    { 
        label: "Hết hạn", 
        value: "expired", 
        color: "#FF6347",
        icon: "fas fa-times",
    },
];


export const COMMISSION_TYPE = "commission";
export const WITHDRAW_TYPE = "withdraw";

export const GIFT_TYPE = 'gift';
export const NORMAL_TYPE = 'normal';