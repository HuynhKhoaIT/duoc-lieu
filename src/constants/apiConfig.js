import { apiUrl } from ".";

const baseHeader = {
    "Content-Type": "application/json",
};

const apiConfig = {
    account: {
        loginBasic: {
            url: `${apiUrl}api/v2/login`,
            method: "POST",
            headers: baseHeader,
        },
        register: {
            url: `${apiUrl}api/v2/register`,
            method: "POST",
            headers: baseHeader,
        },
        updatePassword: {
            url: `${apiUrl}api/v2/user/update-password`,
            method: "POST",
            headers: baseHeader,
            isAuth: true,
        },
        updateTransaction: {
            url: `${apiUrl}api/v2/user/update-transaction-password`,
            method: "POST",
            headers: baseHeader,
            isAuth: true,
        },
        verifyTransaction: {
            url: `${apiUrl}api/v2/user/verify-transaction-password`,
            method: "POST",
            headers: baseHeader,
            isAuth: true,
        },
    },
    profile: {
        getDetail: {
            url: `${apiUrl}api/v2/my-profile`,
            method: "GET",
            headers: baseHeader,
            isAuth: true,
        },
        update: {
            url: `${apiUrl}api/v2/my-profile`,
            method: "PUT",
            headers: baseHeader,
            isAuth: true,
        },
    },
    products: {
        getList: {
            url: `${apiUrl}api/v2/products`,
            method: "GET",
            headers: baseHeader,
        },
        getDetail: {
            url: `${apiUrl}api/v2/products/:id`,
            method: "GET",
            headers: baseHeader,
        },
        getProductByType: {
            url: `${apiUrl}api/v2/products/type/:id`,
            method: "GET",
            headers: baseHeader,
        },
    },
    category: {
        getList: {
            url: `${apiUrl}api/v2/categories`,
            method: "GET",
            headers: baseHeader,
        },
    },
    carts: {
        getList: {
            url: `${apiUrl}api/v2/carts`,
            method: "GET",
            headers: baseHeader,
            isAuth: true,
        },
        getById: {
            url: `${apiUrl}api/v2/carts/:id`,
            method: "GET",
            headers: baseHeader,
            isAuth: true,
        },
        create: {
            url: `${apiUrl}api/v2/carts`,
            method: "POST",
            headers: baseHeader,
            isAuth: true,
        },
        update: {
            url: `${apiUrl}api/v2/carts/:id`,
            method: "PUT",
            headers: baseHeader,
            isAuth: true,
        },
        delete: {
            url: `${apiUrl}api/v2/carts/:id`,
            method: "DELETE",
            headers: baseHeader,
            isAuth: true,
        },
    },
    news: {
        getList: {
            url: `${apiUrl}api/v2/news`,
            method: "GET",
            headers: baseHeader,
        },
        getDetail: {
            url: `${apiUrl}api/v2/news/:id`,
            method: "GET",
            headers: baseHeader,
        },
    },
    slide: {
        getList: {
            url: `${apiUrl}api/v2/slides`,
            method: "GET",
            headers: baseHeader,
        },
    },
    checkOut: {
        create: {
            url: `${apiUrl}api/v2/orders/create-from-cart`,
            method: "POST",
            headers: baseHeader,
            isAuth: true,
        },
    },
    checkOutV3: {
        create: {
            url: `${apiUrl}api/v3/orders`,
            method: "POST",
            headers: baseHeader,
            isAuth: true,
        },
    },
    order: {
        getList: {
            url: `${apiUrl}api/v2/orders`,
            method: "GET",
            headers: baseHeader,
            isAuth: true,
        },
    },
    feedback: {
        create: {
            url: `${apiUrl}api/v2/orders/:id/feedback`,
            method: "PUT",
            headers: baseHeader,
            isAuth: true,
        },
    },
    referrals: {
        getList: {
            url: `${apiUrl}api/v2/users/referrals`,
            method: "GET",
            headers: baseHeader,
            isAuth: true,
        },
    },
    dashboard: {
        getList: {
            url: `${apiUrl}api/v2/my-dashboard`,
            method: "GET",
            headers: baseHeader,
            isAuth: true,
        },
    },
    wallet: {
        history: {
            url: `${apiUrl}api/v2/wallet/history`,
            method: "GET",
            headers: baseHeader,
            isAuth: true,
        },
        transfer: {
            url: `${apiUrl}api/v2/wallet/transfer`,
            method: "POST",
            headers: baseHeader,
            isAuth: true,
        },
        balance: {
            url: `${apiUrl}api/v2/wallet/balance`,
            method: "GET",
            headers: baseHeader,
            isAuth: true,
        },
        withdraw: {
            url: `${apiUrl}api/v2/wallet/withdraw-requests`,
            method: "POST",
            headers: baseHeader,
            isAuth: true,
        },
    },
};
export default apiConfig;
