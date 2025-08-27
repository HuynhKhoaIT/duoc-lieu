import { apiUrl } from '.';

const baseHeader = {
    'Content-Type': 'application/json',
};

const apiConfig = {
    account: {
        sendOtp: {
            url: `${apiUrl}api/v1/send-otp`,
            method: 'POST',
            headers: baseHeader,
        },
        loginBasic: {
            url: `${apiUrl}api/login`,
            method: 'POST',
            headers: baseHeader,
        },
    },
    request:{
        getList: {
            url: `${apiUrl}api/v1/job-requests`,
            method: 'GET',
            headers: baseHeader,
        },
        getDetail: {
            url: `${apiUrl}api/v1/job-requests/:id`,
            method: 'GET',
            headers: baseHeader,
        },
        applyRequest:{
            url: `${apiUrl}api/v1/requests/:requestId/apply`,
            method: 'POST',
            headers: baseHeader,
            isAuth:true,
        },
    },
    products:{
        getList: {
            url: `${apiUrl}api/v2/products`,
            method: 'GET',
            headers: baseHeader,
        },
        getDetail: {
            url: `${apiUrl}api/v2/products/:id`,
            method: 'GET',
            headers: baseHeader,
        },
    },
    category:{
        getList: {
            url: `${apiUrl}api/v1/categories`,
            method: 'GET',
            headers: baseHeader,
        },
    },
    cart: {
        getList: {
            url: `${apiUrl}api/v1/cart`,
            method: 'GET',
            headers: baseHeader,
            isAuth:true,
        },
        add: {
            url: `${apiUrl}api/v1/cart/add`,
            method: 'POST',
            headers: baseHeader,
            isAuth:true,
        },
        update: {
            url: `${apiUrl}api/v1/cart/update`,
            method: 'PUT',
            headers: baseHeader,
            isAuth:true,
        },
        remove: {
            url: `${apiUrl}api/v1/cart/remove`,
            method: 'DELETE',
            headers: baseHeader,
            isAuth:true,
        },
    },
    order:{
        add: {
            url: `${apiUrl}api/v1/order`,
            method: 'POST',
            headers: baseHeader,
            isAuth:true,
        },
    },
    news:{
        getList: {
            url: `${apiUrl}api/v2/news`,
            method: 'GET',
            headers: baseHeader,
        },
        getDetail: {
            url: `${apiUrl}api/v2/news/:id`,
            method: 'GET',
            headers: baseHeader,
        },
    },
    slide:{
        getList: {
            url: `${apiUrl}api/v2/slides`,
            method: 'GET',
            headers: baseHeader,
        },
    },
};
export default apiConfig;
