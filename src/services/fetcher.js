import axios from "axios";

const instance = axios.create();

const fetcher = async (
    { method, url, headers = {}, isAuth } = {},
    { data, params, pathParams, context = {}, signal, ...rest } = {},
) => {
    try {
        // update path params
        if (pathParams) {
            for (let key of Object.keys(pathParams)) {
                const keyCompare = `:${key}`;
                if (url.includes(keyCompare)) {
                    url = url.replace(keyCompare, pathParams[key]);
                }
            }
        }

        // lấy token từ context (SSR) thay vì cookie
        console.log("context",context);
        const token = context?.token;

        if (token && isAuth) {
            headers.Authorization = `Bearer ${token}`;
        }

        if (headers["Content-Type"] === "multipart/form-data") {
            let formData = new FormData();
            Object.keys(data).forEach((item) => {
                if (Array.isArray(data[item])) {
                    data[item].forEach((file) => {
                        formData.append(`${item}[]`, file);
                    });
                } else {
                    formData.append(item, data[item]);
                }
            });
            data = formData;
        }

        return await instance.request({
            method,
            url,
            headers,
            data,
            params,
            signal,
            context,
            ...rest,
        });
    } catch (error) {
        console.log(error);

        // const { req, res } = context;

        // if (error?.response?.status === 401) {
        //     logout({ req, res });
        // } else if (error?.response?.status === 403) {
        //     redirect({ context, path: paths.forbidden });
        // }

        throw error;
    }
};

export default fetcher;
